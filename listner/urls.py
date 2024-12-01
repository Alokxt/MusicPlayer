from django.contrib import admin
from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('playlist/',views.playlist,name="playlist"),
    path('api/getlist/<int:playlist_id>/',views.getlist,name="get-playlist"),
    path('listplay/<int:playlist_id>/',views.playlistshow,name="playlistshow"),
    path('api/get_all_playlists/', views.get_all_playlists, name='get-all-playlists'),
]
