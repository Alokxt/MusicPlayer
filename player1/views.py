from django.shortcuts import render,redirect
from .models import *
from django.contrib.auth import user_logged_in,user_logged_out,authenticate,login
from django.contrib.auth.decorators import login_required
from django.contrib.auth import decorators
from django.http import JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.template.loader import render_to_string

from .forms import *



def play(request):
    user = request.user
    print(user)
    song_info = Songs.objects.all()
    l=[]
    for s in song_info:
        l.append(s)
    
    context ={'songs':l,'user':user}
    print(l[0].songname)



    return render(request,'index.html',context)

def getsongs(request):
    songs = Songs.objects.all()
    d =[]
    for s in songs:
        song_data={
            'nam':s.songname,
            'Id':s.id,
            'artist':s.Artist,
            'sog':s.song.url if s.song else None,
            'poster':s.poster.url if s.poster else None,
            
        }
        d.append(song_data)
    print(d)


    return JsonResponse(d,safe=False)

def signup(request):
    if(request.method == "POST"):
        form1 = userregistrationform(request.POST)
        form2 = AuthenticationForm(request,data = request.POST)
        if(form1.is_valid()):
            username = form1.cleaned_data.get('username')
            pass1 = form1.cleaned_data.get('password1')
            pass2 = form1.cleaned_data.get('password2')
            email = form1.cleaned_data.get('email')
            if(pass1 == pass2):
                my_user = form1.save(commit=False)
                my_user.save()
                messages.success(request,f'account createdd successfully')
                return redirect('/')
            else:
                messages.success(request,f'enter correct password both times')
                return redirect('signup/')
                
            #return JsonResponse({'success':True,'message':'enter correct password both times'},safe=False)
        '''if(form2.is_valid()):
            usern = form2.cleaned_data.get('username')
            passw = form2.cleaned_data.get('password')
            user = authenticate(username = usern,password=passw)
            if user is not None:
                login(request,user)
                messages.success(request, "Logged in successfully!")
                return JsonResponse({'success': True, 'message': 'Logged in successfully!'})
               
            else:
                messages.success(request,f'enter correct username or password')
                return JsonResponse({'success':False,'message':'enter correct username or password'}) '''
    else:
        form1 = userregistrationform()
        form2 = AuthenticationForm()
    #signupform = render_to_string('login.html',{'form':form1},request)
    #loginform = render_to_string('login.html',{'form':form2},request)
    l = {'form':form1}
    

    return render(request,'signup.html',l)

def login_page(request):
    if(request.method == "POST"):
        form = AuthenticationForm(request,data = request.POST)
        if(form.is_valid()):
            usern = form.cleaned_data.get('username')
            passw = form.cleaned_data.get('password')
            user = authenticate(username = usern,password=passw)
            if user is not None:
                login(request,user)
                return redirect('play/')
            else:
                messages.success(request,f'enter correct username or password')
                return render()
    else:
        form = AuthenticationForm()

   
    
    return render(request,'login.html',{'loginform':form})


def songview(request,song_id):
    song = Songs.objects.filter(id = song_id)
    b = []
    for s in song:
        d = {'songname':s.songname,'songurl':s.song,
             'poster':s.poster,'lyrics':s.lyrics}
        b.append(d)

    artist = song.Artist
    songsfrom = Songs.objects.filter(Artist = artist).exclude(song)
    l = []
    for s in songsfrom:
        d = {'songname':s.songname,
             'songurl':s.song,
             'poster':s.poster,'lyrics':s.lyrics}
        l.append(d)
    context = {'song':song,'otherlist':l}
    return render(request,'songview.html',context)


            
def search_songs(request):
    query = request.GET.get('q','')
    print(query)
    songs = []
    if(query):
        songs = Songs.objects.filter(songname__icontains = query)
    l = []
    for p in songs:
        d={
            'name':p.songname,
            'artist':p.Artist,
            'id':p.id,
        }
        l.append(d)
    return JsonResponse({'result':l})

