from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta

def get_user_tokens(session_key):
    user_tokens = SpotifyToken.objects.filter(user=session_key)
    if user_tokens.exists() : return user_tokens[0]
    return None

def handle_user_tokens(session_key, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_key)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_key, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()


def is_sotify_authenticated(session_key):
    tokens = get_user_tokens(session_key)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            pass
    return False

def refresh_spotify_token(session_key):
    pass