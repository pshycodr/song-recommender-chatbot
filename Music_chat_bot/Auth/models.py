from django.db import models

# Create your models here.
class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)