from django.db import models
from authentication.models import *


class Category(models.Model):
    name        = models.CharField(max_length=64)

    def __str__(self):
        return self.name



class Article(models.Model):
    title        = models.CharField(max_length=256)
    content      = models.TextField()
    category     = models.ForeignKey('Category',on_delete=models.DO_NOTHING)
    image        = models.ImageField(upload_to='media/articles')
    datetime     = models.DateTimeField()
    author       = models.ForeignKey('authentication.Author',on_delete=models.DO_NOTHING,related_name='article_author')

    def __str__(self):
        return self.title
