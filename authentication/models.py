from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser


class Author(User):
    image           = models.ImageField(upload_to='media/author',null=True,blank=True)
    bio             = models.TextField(max_length=512,null=True,blank=True)
    short_bio       = models.CharField(max_length=128,null=True,blank=True)
    location        = models.CharField(max_length=128,null=True,blank=True)
    work            = models.TextField(max_length=256,null=True,blank=True)
    experience      = models.CharField(max_length=2,null=True,blank=True)
    age             = models.CharField(max_length=2,null=True,blank=True)
    tags            = models.ManyToManyField('Tags',blank=True,related_name='author_tags')
    languages       = models.ManyToManyField('Languages',blank=True,related_name='author_languages')
    education       = models.ForeignKey('Education',blank=True,related_name='author_education',on_delete=models.CASCADE,null=True)
    social_media    = models.ManyToManyField('SocialMedia',blank=True,related_name='author_social_media')
    phone           = models.CharField(max_length=16,null=True,blank=True)
    skills          = models.ManyToManyField('Skills',blank=True,related_name='author_skills')

    def __str__(self):
        return self.username

class Tags(models.Model):
    title           = models.CharField(max_length=64)

    def __str__(self):
        return self.title

class Languages(models.Model):
    title           = models.CharField(max_length=64)

    def __str__(self):
        return self.title


class Education(models.Model):
    title           = models.CharField(max_length=64)

    def __str__(self):
        return self.title

class Skills(models.Model):
    title           = models.CharField(max_length=64)

    def __str__(self):
        return self.title


class SocialMedia(models.Model):
    title           = models.CharField(max_length=64)
    url             = models.URLField(max_length=512)
    icon            = models.ImageField(upload_to='author/social_media_icon')

    def __str__ (self):
        return self.title