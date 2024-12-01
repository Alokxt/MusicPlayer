from django.db import models

# Create your models here.
class Songs(models.Model):
    song = models.FileField(upload_to='media/')
    poster = models.ImageField(upload_to='media/',null=True,default=None)
    songname = models.CharField(max_length=200)   
    Artist = models.CharField(max_length=300)
    album_name = models.CharField(max_length=300)
    lyrics = models.TextField()

    def __str__(self):
        return f'{self.songname}'

