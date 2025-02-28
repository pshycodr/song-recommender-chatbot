
from django.urls import path
from Auth.views import *

urlpatterns = [
    
    path('auth_check/', auth_check),
    path('signinOauth/', hello_world),
     path('csrf/', csrf_token_view, name='csrf_token')
    # path('get-songs', hello_world),
]
