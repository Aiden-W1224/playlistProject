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
        queryArray = []
        for track in json_data[0]:
            track_name = track['track']['name']
            artists = track['track']['artists']
            for artist in artists:
                artist_name = artist['name']
                track_name = track_name + " " + artist_name
            queryArray.append(track_name)
        print(queryArray)
        return jsonify({"status": "success", "message": "JSON processed successfully"})
    except Exception as e:
        # Handle exceptions if any
        return jsonify({e})
    
def searchSongs(queryArray):
    videoId_array = []
    for searchString in queryArray:
        result = YTMusic.search(searchString,limit= 1, ignore_spelling=True)
        video_id = [item['videoId'] for item in result if 'videoId' in item]
        videoId_array.append(video_id)

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
    


