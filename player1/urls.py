from django.contrib import admin
from player1 import views
from django.urls import path

urlpatterns = [
    path('',views.login_page,name="login"),
    path('play/',views.play,name="player"),
    path('api/song/',views.getsongs,name="get_song"),
    path('signup/',views.signup,name="signup"),
    path('seach-song/api/',views.search_songs,name="search_songs"),
    ]