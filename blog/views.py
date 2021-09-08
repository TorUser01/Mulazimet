from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404
from django.conf import settings
from os.path import isfile, join
from mimetypes import MimeTypes
from os import listdir
import hashlib
import json
import time
import hmac
import copy
import sys
import os




def index_view(request):

    if request.user.is_authenticated:
        current_author = get_object_or_404(Author,username=request.user.username)
    else:
        current_author = None

    keyword = request.GET.get("keyword")
    if keyword:
        article_search = Article.objects.filter(title__contains=keyword,content__contains=keyword)
        context={
            'articles': article_search,
            'current_author': current_author
        }
        return render(request,'search.html',context=context)
    context = {
        'articles': Article.objects.all()[:6],
        'categorys': Category.objects.all(),
        'current_author': current_author


    }
    return render(request, 'index.html', context=context)

def category_detail(request,id):
    if request.user.is_authenticated:
        current_author = get_object_or_404(Author,username=request.user.username)
    else:
        current_author = None

    categorys = get_object_or_404(Category,id=id)
    context={
        'category':categorys,
        'articles':Article.objects.filter(category=categorys),
        'r_article':Article.objects.filter(category=categorys)[:3],
        'current_author': current_author
    }
    return render(request,'category_detail.html',context=context)



def article_detail(request,id):

    if request.user.is_authenticated:
        current_author = get_object_or_404(Author,username=request.user.username)
    else:
        current_author = None

    articles = get_object_or_404(Article,id=id)
    author_articles  = Article.objects.filter(author=articles.author)
    context={
        'articles': articles,
        'category':Category.objects.filter(article=articles),
        'author_articles': author_articles,
        'current_author': current_author
    }
    return render(request,'article_detail.html',context=context)