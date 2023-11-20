from flask import Flask, request 
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)

@app.route("/search", methods=['POST'])
def hello_world():
    try:
        json_data = request.get_json()
        return json_data
    except Exception as e:
        # Handle exceptions if any
        return 0