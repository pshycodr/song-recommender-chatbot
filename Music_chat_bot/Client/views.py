from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

import spotipy
from spotipy.oauth2 import SpotifyOAuth,  SpotifyClientCredentials
from config import *

from Auth.utils import get_user_tokens
from Auth.models import SpotifyToken

from asgiref.sync import async_to_sync
from .utils import *

import json 


@api_view(['POST'])
def user_query(request):
    try :
        
        if not request.data.get("message"):
            return Response({"error": "No query provided"}, status=400)
        
        session_id = request.session.session_key

        if not is_spotify_authenticated(session_id): 
            return Response({'message': 'You are not authorized, Please login', 'error': True})

        print("YOU BUSTED")
        # Convert async function call to sync
        response = async_to_sync(gemini_response)(request)
        

        if response.get('search_song'): 
            query = response.get('search_song_query')
            songs = search_song(session_id ,query)

            return  Response({
                            "songs": songs,
                            "message": response.get('message'),
                            "search_song": True
                        })
        
        if response.get('create_album'):
            album_query = response.get('create_album_query')
            playlist = create_album(album_name=album_query['album_name'],
                                    album_genre=album_query['album_genre'],
                                    album_artist=album_query['album_artist'],
                                    number_of_songs=album_query['number_of_songs'],
                                    session_id=session_id)

            return Response({
                'message' : response.get('message'),
                'playlist': playlist,
                'create_album': True    
            })

        return Response(response)
    
    except Exception as e:
        return Response({"error": f"Failed to get response: {str(e)}"})

