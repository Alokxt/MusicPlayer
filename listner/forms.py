from django import forms
from .models import Playlist
from player1.models import Songs

class PlaylistForm(forms.ModelForm):
    class Meta:
        model = Playlist
        fields = ['name']

class AddSongToPlaylistForm(forms.Form):
    playlist = forms.ModelChoiceField(queryset=Playlist.objects.all())
    songs = forms.ModelMultipleChoiceField(queryset=Songs.objects.all(), widget=forms.CheckboxSelectMultiple)