from pymongo.mongo_client import MongoClient
from bson.objectid import ObjectId
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from config import MONGO_CONNECTION_STRING

import pandas as pd
import math
import warnings


def connect_to_db():
    uri = MONGO_CONNECTION_STRING
    client = MongoClient(uri)
                          
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("successfully connected to MongoDB!")
    except Exception as e:
        print(e)
        
    return client


def get_data(user_id,client):
   
    
    # select database and collections to read from
    db = client["test"]
    hotels_collection = db["hotels"]
    reservations_collection = db["reservations"]
    
    # get users reservations
    user_id = ObjectId(user_id)
    user_reservations = list(reservations_collection.find({"user_id": user_id}))
    user_hotels = []
    
    for res in user_reservations:
        hotel = hotels_collection.find_one({"_id": res['hotel_id']},{"name":1, "rating":1, "price":1, "amenities":1})
    
        user_hotels.append(hotel)
        
    user_hotels_df = pd.DataFrame(user_hotels)
    
    # load hotels from saved df if it exists
    try:
        hotels_df = pd.read_pickle('hotels.pkl')
    except FileNotFoundError: 
        hotels_df = pd.DataFrame(list(hotels_collection.find({},{'country':1, 'city':1, 'distanceFromCityCenter':1, 'images':1, "_id":1,"name":1, "rating":1, "price":1, "amenities":1})))
        hotels_df.to_pickle('hotels.pkl')
        
    return hotels_df, user_hotels_df
    
        
def clean_data(hotels_df, user_hotels_df):
    # remove all columns except: price, rating, amenities,Name
    hotels_df = hotels_df.drop(["_id"], axis=1)
    user_hotels_df = user_hotels_df.drop(["_id"], axis=1)
   
    # normalize numerical variables
    scaler = MinMaxScaler() 
    hotels_df [['rating', 'price']] = scaler.fit_transform(hotels_df[['rating', 'price']])
    user_hotels_df [['rating', 'price']] = scaler.fit_transform(user_hotels_df[['rating', 'price']])
    
    # encode non-numerical values
    amenities = hotels_df['amenities'].str.get_dummies(',')
    amenities = amenities.rename(columns=lambda x: x.strip().replace("'", '').translate({ord('['): None, ord(']'): None, ord('"'): None}))
    hotels_df = pd.concat([hotels_df.drop('amenities', axis=1), amenities], axis=1) # combine with hotels data
    
    amenities = user_hotels_df['amenities'].str.get_dummies(',')
    amenities = amenities.rename(columns=lambda x: x.strip().replace("'", '').translate({ord('['): None, ord(']'): None, ord('"'): None}))
    user_hotels_df = pd.concat([user_hotels_df.drop('amenities', axis=1), amenities], axis=1)
    
    # drop null values
    hotels_df.dropna()
    user_hotels_df.dropna()
    
    # remove absent columns
    common_cols = hotels_df.columns.intersection(user_hotels_df.columns)
    hotels_df = hotels_df[common_cols]
    user_hotels_df = user_hotels_df[common_cols]
   
    # remove duplicate columns
    user_hotels_df = user_hotels_df.loc[:,~user_hotels_df.columns.duplicated()] # type: ignore
    hotels_df = hotels_df.loc[:,~hotels_df.columns.duplicated()] # type: ignore
    
    return hotels_df, user_hotels_df


def get_recommendations(user_id, client):
    warnings.filterwarnings("ignore", category=FutureWarning)
    
    # prepare data
    pd.set_option('display.max_rows', None)
    pd.set_option('display.max_columns', None)
    hotels_df, user_history_df = get_data(user_id, client)
    hotels_df, user_history_df = clean_data(hotels_df, user_history_df)
  
    # remove duplicate hotels
    user_history_df = hotels_df.query('name in @user_history_df.name')
    hotels_df = hotels_df.query('name not in @user_history_df.name')

    # calculate values mean 
    user_history_df_mean = user_history_df.iloc[:,1:].mean().apply(math.ceil).to_frame().transpose()
    user_history_df_mean['rating'] = user_history_df.rating.mean()
    user_history_df_mean['price']= user_history_df.price.mean()

    user_history_df = pd.concat([user_history_df, user_history_df_mean], ignore_index=True)
    user_history_df.iloc[-1, 3:] = 1
    
    # calculate similarity    
    similarity_scores = cosine_similarity(user_history_df.drop(['name'], axis=1), hotels_df.drop(['name'], axis=1))
    
    # read original hotels
    hotels = pd.read_pickle('hotels.pkl')
    hotels['_id'] = hotels['_id'].astype(str)
    
    # get recommendations
    recommendations = hotels.iloc[similarity_scores.argsort()[-1][::-1]][:9]
    recommendations = recommendations.loc[:, ['_id','name', 'rating', 'country', 'city', 'distanceFromCityCenter', 'images']]
    recommendations['images'] = recommendations['images'].apply(lambda x: x[0])
    
    # return recommendations as json
    return recommendations.to_json(orient='records')
