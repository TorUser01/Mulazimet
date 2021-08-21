from django.contrib import admin
from blog.models import *

admin.site.register(Article)
admin.site.register(Category)
admin.site.register(Author)