
from django.urls import path
from Client.views import *


urlpatterns = [
    path('user-query/', user_query), 
    path('search-song/', search_song),
]
