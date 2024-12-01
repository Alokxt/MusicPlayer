from django.db import models
from django.contrib.auth.models import User 
from player1.models import Songs

# Create your models here.
class Playlist(models.Model):
    User = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    list = models.ManyToManyField(Songs,blank=True)
    name = models.CharField(max_length=250)

    def __str__(self):
        return f'{self.name}'


