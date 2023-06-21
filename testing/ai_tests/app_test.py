import sys
import os
import json
import warnings

ai_dir = os.path.abspath('ai')
sys.path.append(ai_dir)

from app import app # type: ignore
from collections import OrderedDict

def test_planner_valid_request(client):
    request_body = {
        "Budget": "50-99",
        "Season": "Winter",
        "Age_0": 1,
        "Age_20": 1,
        "Age_40": 1,
        "Age_60": 1,
        "Beach": 0,
        "Adventure": 1,
        "History": 0,
        "Culture": 1,
        "Nightlife": 1,
        "Shopping": 1,
        "Cuisine": 1,
        "Nature": 1,
        "Urban": 1,
        "Rural": 1,
        "Sea": 1,
        "Mountain": 0,
        "Lake": 0,
        "Desert": 0,
        "Plains": 1,
        "Jungle": 0
    }
    
    response = client.post('/planner', json=json.dumps(request_body))
    assert response.status_code == 200
    
    data = response.get_json()
    assert 'cities' in data
    assert len(data['cities']) == 5


    
def test_planner_invalid_request(client):
    response = client.post('/planner', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'Invalid request: Unable to retrieve cities.'

def test_recommender_valid_request(client):
    response = client.post('/recommender', json={'userId': '6437963c0f9d2c0535db4982'})
    assert response.status_code == 200
    data = response.get_json()
    
def test_recommender_invalid_user_id(client):
    response = client.post('/recommender', json={'userId': 'invalid_id'})
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'Error retrieving data for user ID invalid_id'

