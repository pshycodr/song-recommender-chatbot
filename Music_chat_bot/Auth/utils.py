from .models import SpotifyToken
from config import *
from requests import post, put, get
from django.utils import timezone
from datetime import timedelta

BASE_URL = "https://api.spotify.com/v1/me"

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    print("FROM GET_USER_TOKEN ==> ", user_tokens)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def create_or_update_token(**kwargs):
    
    required_params = ['session_id', 'access_token', 'refresh_token', 'expires_in', 'token_type']
    missing = [p for p in required_params if p not in kwargs]

    if missing:
        raise ValueError(f"Missing required parameters: {', '.join(missing)}")
    
    session_id = kwargs['session_id']
    access_token = kwargs['access_token']
    refresh_token = kwargs['refresh_token']
    expires_in = kwargs['expires_in']
    token_type = kwargs['token_type']
    
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens : 
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields = ['access_token', 'refresh_token', 'token_type', 'expires_in'])

    else :
        tokens = SpotifyToken(user=session_id, 
                              access_token=access_token, 
                              refresh_token=refresh_token, 
                              token_type=token_type, 
                              expires_in=expires_in)
        
        tokens.save()


def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')

    create_or_update_token(
        session_id, access_token, token_type, expires_in, refresh_token)


def is_spotify_authenticated(session_id):
    try:
        print("hi")
        tokens = get_user_tokens(session_id)
        print("FROM is_spotify_authenticated TOKENS ==>> ", tokens, timedelta())
        if tokens:
            expiry = tokens.expires_in
            print("expiry ==>> ", expiry)
            if expiry <= timezone.now():
                refresh_spotify_token(session_id)

            return True

        return False

    except:
        return False
