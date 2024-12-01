from django.shortcuts import render,redirect
from .forms import *
from django.http import JsonResponse
from django.template.loader import render_to_string

# Create your views here.
def playlist(request):
    p = Playlist.objects.filter(User = request.user)
    
    if(request.method == "POST"):
        form = PlaylistForm(request.POST)
        form1 = AddSongToPlaylistForm(request.POST)
        if(form.is_valid()):
            playlist = form.save(commit=False)
            playlist.User = request.user
            playlist.save()
            print(playlist.name)

        if(form1.is_valid()):
            l = form1.cleaned_data.get('songs')
            playlist = form1.cleaned_data.get('playlist')
            playlist.list.add(*l)
            return redirect('playlist')
    else:
        form = PlaylistForm()
        form1 = AddSongToPlaylistForm()
        
    return render(request,'Playlist.html',{'create':form,'list':p,'add':form1})
    #return JsonResponse({'success': False, 'error': 'Invalid request method'})
    



def getlist(request,playlist_id):
    try:

        play = Playlist.objects.get(id=playlist_id)
        songl = []
        for s in play.list.all():
        
            songlist = {
                'sog':s.song.url if s.song else None,
                'name':s.songname
            }
            songl.append(songlist)
        if(songl):
            return JsonResponse({'playlist':play.name,'songs':songlist,'success':True},safe=False)
        else:
            return JsonResponse({'success':False,'msg':'create playlist or add songs'},safe=False)
    except Playlist.DoesNotExist:
        return JsonResponse({
            'success': False,
            'msg': 'Playlist not found.'
        })

    
def playlistshow(request,playlist_id):
    return render(request,'listplay.html')

def get_all_playlists(request):
    playlists = Playlist.objects.all()
    data = []

    for play in playlists:
        songlist=[]
        for s in play.list.all():
           d= {'songurl': s.song.url if s.song else None, 'name': s.songname,'Artist':s.Artist,'id':s.id}
           songlist.append(d)
            
        data.append({
            'playlist': play.name,
            'songs': songlist,
        })

    return JsonResponse({
        'playlists': data,
        'success': True
    })




