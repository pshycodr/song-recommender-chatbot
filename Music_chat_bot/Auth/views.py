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


from django.http import JsonResponse
from django.middleware.csrf import get_token

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})