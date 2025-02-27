
from django.urls import path
from Auth.views import *

urlpatterns = [
    
    path('auth_check/', auth_check),
    path('signinOauth/', hello_world),
    # path('get-songs', hello_world),
]
