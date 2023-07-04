import pandas as pd
import numpy as np
import json
import warnings

from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder


# Read data
df = pd.read_excel("./ai/Model_Data.xlsx")

cdf = df[['City, Country', 'Budget (daily)', 'Best Season',
        'Age_0', 'Age_20', 'Age_40', 'Age_60',
        'Beach', 'Adventure', 'History', 'Culture', 'Nightlife', 'Shopping', 'Cuisine', 'Nature',
        'Urban', 'Rural', 'Sea', 'Mountain', 'Lake', 'Desert', 'Plains', 'Jungle']]

le_city = LabelEncoder()
le_season = LabelEncoder()
le_budget = LabelEncoder()
knn = KNeighborsClassifier(n_neighbors=6, metric='euclidean')


def innit_planner():
    # Initialize Encoders
    warnings.filterwarnings('ignore')

    cdf['City, Country'] = le_city.fit_transform(cdf['City, Country'])
    cdf['Best Season'] = le_season.fit_transform(cdf['Best Season'])
    cdf['Budget (daily)'] = le_budget.fit_transform(cdf['Budget (daily)'])
    
    X = cdf.drop('City, Country', axis=1)
    y = cdf['City, Country']
    knn.fit(X, y)

def get_cities(data):
    warnings.filterwarnings('ignore')
    try:
        # turn json to numpy array
        input_data = np.array(list(json.loads(data).values()))
        
        # Encode input
        input_data[0] = le_budget.transform([input_data[0]])[0] # type: ignore
        input_data[1] = le_season.transform([input_data[1]])[0] # type: ignore
        input_data = input_data.reshape(1, -1)
        input_data = np.array(input_data, dtype=int)

        # Get closest data points to input
        nearest_cities_loc = knn.kneighbors(input_data, return_distance=False)
        nearest_cities_loc = nearest_cities_loc.flatten() # type: ignore

        nearest_cities = []

        for city in nearest_cities_loc:
            city_dict = {}
            city_dict["City"] = df['City'].iloc[city]
            city_dict["Photo"] = df['Photo'].iloc[city]
            nearest_cities.append(city_dict)
        return nearest_cities
    
    except Exception:
        return []