from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time
import requests
from ytmusicapi import YTMusic
import time


app = Flask(__name__)
CORS(app)

@app.route("/search", methods=['POST'])
def sync_playlist():
    try:
        ytmusic = YTMusic('oauth.json')
        json_data = request.get_json()
        playlistId = ytmusic.create_playlist(json_data[1], "", json_data[2])
        print("Create playlist")
        queryArray = extractQuery(json_data) # returns an array of search string containing track name/artist
        searchedSongs = searchSongs(queryArray)
        ytmusic.add_playlist_items(playlistId, searchedSongs[0], duplicates=True)

        return jsonify({"status": "success", "message": "JSON processed successfully", "songs": searchedSongs[1]})
    except Exception as e:
        # Handle exceptions if any
        return jsonify({e})

def extractQuery(json_data_input):
    queryArray = []
    for track in json_data_input[0]:
        track_name = track['track']['name']
        artists = track['track']['artists']
        for artist in artists:
            artist_name = artist['name']
            track_name = track_name + " " + artist_name
        queryArray.append(track_name)
    return queryArray

def searchSongs(queryArray):
    ytmusic = YTMusic('oauth.json')
    videoId_array = []
    emptySearch = []
    for searchString in queryArray: 
        result = ytmusic.search(query=searchString, filter='songs', ignore_spelling=True, limit=1)
        if not result:
            result = ytmusic.search(query=searchString, filter='videos', ignore_spelling=True, limit=1)
            if not result:
                emptySearch.append(searchString)
                continue
        videoId_array.append(result[0]['videoId'])
    return videoId_array, emptySearch

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
    


