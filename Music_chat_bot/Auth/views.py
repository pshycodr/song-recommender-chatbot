from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from requests import Request, post
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from config import *
from .utils import *


@api_view(['GET'])
def auth_check(request):
    scopes = 'user-top-read user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private'

    url = Request('GET', 'https://accounts.spotify.com/authorize', params={
        'scope': scopes,
        'response_type': 'code',
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'client_id': SPOTIFY_CLIENT_ID
    }).prepare().url

    return Response({'url': url}, status=status.HTTP_200_OK)




def hello_world(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')
    
    if error:
        return Response({'error': error}, status=400)
    
    if not code:
        return Response({'error': 'No code provided'}, status=400)
    
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()
        
    print("Session-key ====>> " , request.session.session_key)

    create_or_update_token(session_id=request.session.session_key, 
                           access_token=access_token, 
                           token_type=token_type, 
                           expires_in=expires_in, 
                           refresh_token=refresh_token)

    return redirect('http://localhost:5173/chat')



# @api_view(['GET'])
# def auth_check(request):
#     try:
#         sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
#             client_id=SPOTIFY_CLIENT_ID,
#             client_secret=SPOTIFY_CLIENT_SECRET,
#             redirect_uri=SPOTIFY_REDIRECT_URI,
#             scope="user-top-read user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private"
#         ))
        
#         user = sp.current_user()
                
#         return Response({'message': 'You successfully signed in! FROM AUTH SIDE'}, status=200)
#     except Exception as e:
#         raise RuntimeError(f"Failed to initialize Spotify client: {str(e)}")


# @api_view(['GET'])
# def hello_world(request):
#     try:
#         sp_oauth = SpotifyOAuth(
#             client_id=SPOTIFY_CLIENT_ID,
#             client_secret=SPOTIFY_CLIENT_SECRET,
#             redirect_uri=SPOTIFY_REDIRECT_URI,
#             scope="user-top-read user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private"
#         )
#         code = request.GET.get('code')  # Fixed for GET request
#         if not code:
#             return Response({"error": "Authorization code is missing."}, status=status.HTTP_400_BAD_REQUEST)

#         session_token_info = sp_oauth.get_access_token(code, as_dict=True)
#         print("CODE ---->>>>>>> ", session_token_info)
#         return Response({"message": "Spotify authentication successful!", "token_info": session_token_info})
#     except Exception as e:
#         return Response({"error": f"Authentication failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
