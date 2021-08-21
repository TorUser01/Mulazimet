from django.db import models
from django.contrib.auth.models import User,AbstractBaseUser



class Author(User):
    image = models.ImageField(upload_to='media/author')
    bio   = models.TextField(max_length=512)


    def __str__(self):
        return self.username
