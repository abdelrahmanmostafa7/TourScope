import planner
import recommender
import json 

from flask import Flask, request, jsonify
from flask_cors import CORS

planner.innit_planner()
client = recommender.connect_to_db()

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'hello'

@app.route('/planner', methods=['Post'])
def cities():
    input_data = request.get_json()
    cities_res = planner.get_cities(json.dumps(input_data))
    cities_list = []
    for city in cities_res:
        cities_list.append(city)
    return jsonify({'cities': cities_list})

@app.route('/recommender', methods=['Post'])
def recommendations():
    input_data = request.get_json()
    rec_result = recommender.get_recommendations(input_data['userId'], client)
    return rec_result


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)