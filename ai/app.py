import planner
import recommender
import json 

from config import MONGO_CONNECTION_STRING
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from collections import OrderedDict


planner.innit_planner()
client = recommender.connect_to_db(MONGO_CONNECTION_STRING)

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'hello'

@app.route('/planner', methods=['Post'])
def cities():
    input_data = request.get_json()
    
    if type(input_data) == str: input_data = json.loads(input_data) # testing data serialization issue
    cities_res = planner.get_cities(json.dumps(input_data))
    
    if not cities_res:
        error_message = "Invalid request: Unable to retrieve cities."
        return make_response(jsonify({'error': error_message}), 400)
    
    cities_list = []
    for city in cities_res:
        cities_list.append(city)
    return jsonify({'cities': cities_list})

@app.route('/recommender', methods=['Post'])
def recommendations():
    input_data = request.get_json()
    try:
        rec_result = recommender.get_recommendations(input_data['userId'], client)
    except Exception as e: 
        return make_response(jsonify({'error': str(e)}), 400)
    return rec_result


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)