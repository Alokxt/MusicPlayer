from django import forms 
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class userregistrationform(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


'''class userupdate(forms.ModelForm):
    email = forms.EmailField()
    class  Meta:
        model = User
        fields = ['username','email']

class profileupdate(forms.ModelForm):
    class Meta:
        #model = Profile
        fields = ['profile_photo'] '''
