import sys
import os
import pandas as pd
import numpy as np
import json
import pytest


ai_dir = os.path.abspath('ai')
sys.path.append(ai_dir)

from config import MONGO_CONNECTION_STRING # type: ignore
from recommender import *  # type: ignore
from pymongo import MongoClient

def test_connect_to_db():
    client = connect_to_db(MONGO_CONNECTION_STRING) # type: ignore
    assert client is not None
    client.close()
    
def test_connect_to_db_with_invalid_string():
    client = connect_to_db("incorrect_db_connection_string") # type: ignore
    assert isinstance(client, Exception)
    
def test_get_data():
    client = connect_to_db(MONGO_CONNECTION_STRING) # type: ignore
    hotels_df, user_hotels_df = get_data("6437963c0f9d2c0535db4982", client) # type: ignore
    
    assert isinstance(hotels_df, pd.DataFrame)
    assert isinstance(user_hotels_df, pd.DataFrame)
    assert len(hotels_df) > 0
    assert len(user_hotels_df) > 0
    client.close()

def test_get_data_invalid_user_id():
    client = connect_to_db(MONGO_CONNECTION_STRING) # type: ignore
    invalid_user_id = "INVALID_ID"

    with pytest.raises(Exception) as e: # type: ignore
        hotels_df, user_hotels_df = get_data(invalid_user_id, client) # type: ignore

    assert str(e.value) == f"Error retrieving data for user ID {invalid_user_id}"
    client.close()

def test_clean_data():
    # sample data for testing
    hotels_df = pd.DataFrame({
        '_id' :['1', '2', '3'],
        'rating': [4.2, 3.8, 4.5],
        'price': [100, 150, 200],
        'amenities': ["gym, pool", "wifi, parking", "gym, wifi"]
    })

    user_hotels_df = pd.DataFrame({
        '_id' :['9', '8'],
        'rating': [4.0, 3.5],
        'price': [120, 180],
        'amenities': ["gym, pool", "wifi, parking"]
    })

    cleaned_hotels_df, cleaned_user_hotels_df = clean_data(hotels_df, user_hotels_df) # type: ignore 

    assert len(cleaned_hotels_df.columns) == 6  
    assert len(cleaned_user_hotels_df.columns) == 6  
    assert not np.all(cleaned_hotels_df.isnull().values) 
    assert not np.all(cleaned_user_hotels_df.isnull().values)
    
def test_get_recommendations():
    client = connect_to_db(MONGO_CONNECTION_STRING) # type: ignore
    recommendations = get_recommendations("6437963c0f9d2c0535db4982", client) # type: ignore
    
    assert recommendations is not None
    assert len(recommendations) > 0
    
    recommendations_list = json.loads(recommendations)

    expected_keys = ['_id', 'name', 'rating', 'country', 'city', 'distanceFromCityCenter', 'images']
    for rec in recommendations_list:
        assert all(key in rec for key in expected_keys)
        
    assert len(recommendations_list) == 9
    client.close()

def test_get_recommendations_with_invalid_user_id():
    client = connect_to_db(MONGO_CONNECTION_STRING) # type: ignore
    invalid_user_id = 'INVALID_ID'
    
    with pytest.raises(Exception) as e:
        recommendations = get_recommendations(invalid_user_id, client) # type: ignore
        
    assert str(e.value) == f"Error retrieving data for user ID {invalid_user_id}"
    client.close()
    