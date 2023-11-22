from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time
import requests
from ytmusicapi import YTMusic


app = Flask(__name__)
CORS(app)

@app.route("/search", methods=['POST'])
def search_tracks():
    try:
        ytmusic = YTMusic('oauth.json')
        json_data = request.get_json()
        playlistId = ytmusic.create_playlist(json_data[1], "")
        for track in json_data[0]:
            track_name = track['track']['name']
            artists = track['track']['artists']
            for artist in artists:
                artist_name = artist['name']
                print(artist_name)
        return jsonify({"status": "success", "message": "JSON processed successfully"})
    except Exception as e:
        # Handle exceptions if any
        return jsonify({e})

@app.route("/get-token", methods=['GET'])
def send_token():
    try:
        file = open('oauth.json',)
        token_data = json.load(file)
        epoch_time = int(time.time())
        if epoch_time >= token_data["expires_at"]:
            return jsonify({"Token Expired": "Please refresh the token."})
        else:
            return jsonify(token_data)
    except:
        return jsonify({"Error": "Could not find oauth.json"})
    


