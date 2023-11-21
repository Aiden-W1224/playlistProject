from flask import Flask, request, jsonify
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)

@app.route("/search", methods=['POST'])
def hello_world():
    try:
        json_data = request.get_json()
        print("Received and processed data:", processed_data)
        return jsonify({"status": "success", "message": "JSON processed successfully"})
    except Exception as e:
        # Handle exceptions if any
        return jsonify({"status": "error", "message": "JSON is missing 'data' key"})