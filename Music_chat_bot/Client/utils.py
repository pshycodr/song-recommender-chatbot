from config import *
from requests import post, put, get
from pydantic import BaseModel
import google.generativeai as ai
from asgiref.sync import sync_to_async
import json 
import re
from Auth.utils import get_user_tokens
from Auth.models import SpotifyToken
import spotipy
from spotipy.oauth2 import SpotifyOAuth,  SpotifyClientCredentials

ai.configure(api_key=GEMINI_API_KEY)

model = ai.GenerativeModel('gemini-2.0-flash')
chat = model.start_chat()

async def gemini_response(query):
    try:
        with open('prompt.txt', 'r', encoding='utf-8') as file:
            content = file.read()

        response = await sync_to_async(chat.send_message)(f'''{content}\n{query.data["message"]}''')

        # Remove code block markers and trailing commas
        cleaned_response = re.sub(r"```json|```", "", response.text).strip()
        cleaned_response = re.sub(r",\s*([}\]])", r"\1", cleaned_response)  # Removes trailing commas

        response_json = json.loads(cleaned_response)
        return response_json

    except Exception as e:
        return {"error": f"Failed to get response from Gemini: {str(e)}"}


def get_access_token():
    
    try:
        # session_id = request.session.session_key
        session_id = 'qh11mtw7c70f23r8vz4kpzoy47bmcvut'

        
        if not session_id:
            return Response({"error": "No active session found"}, status=401)
        
        user_tokens = get_user_tokens(session_id)
        
        if user_tokens is None:
            return Response({"error": "No access token found for user"}, status=403)
        
        access_token = user_tokens.access_token

        return access_token
    
    except Exception as e:
        return {"error": f"Failed to get access token: {str(e)}"}


def search_song(query, limit=10):
    try:
        access_token = get_access_token()
        sp = spotipy.Spotify(auth=access_token)
        results = sp.search(q=query, limit=limit, type="track")
        data = [{"name": track["name"], "artist": track["artists"][0]["name"], "id": track["id"]}
                for track in results["tracks"]["items"]]
        return data
    except Exception as e:
        return [{"error": f"Failed to search for song: {str(e)}"}]


def create_album(**kwargs):
    try:
        access_token = get_access_token()
        sp = spotipy.Spotify(auth=access_token)
        user_id = sp.me()["id"]
        query = f"{kwargs['album_artist']} {kwargs['album_genre']} {kwargs['album_name']}"
        songs = search_song(query, kwargs['number_of_songs'])
        song_ids = [song['id'] for song in songs]
        
        playlist = sp.user_playlist_create(user_id, kwargs['album_name'], public=True)
        created_playlist = sp.playlist_add_items(playlist["id"], song_ids)
        return {"message": f"Playlist '{playlist['name']}' created successfully!", "playlist_link": playlist["external_urls"]["spotify"]}

    except Exception as e:
        return f"Failed to create playlist: {str(e)}"