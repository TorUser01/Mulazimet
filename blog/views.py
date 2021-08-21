from django.shortcuts import render
from .models import *

def index(requset):
    context ={
        'articles': Article.objects.all(),
        'categorys': Category.objects.all()
    }
    return render(requset,'index.html',context=context)