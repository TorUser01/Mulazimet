from django.shortcuts import render, redirect,get_object_or_404
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.forms import ModelForm, Form
from django import forms
from .models import *
from blog.models import *


class LoginForm(ModelForm, forms.Form):
    class Meta:
        model = Author
        fields = ['username', 'password']
        exclude=[]


def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        if 'remember_me' in request.POST:
            remember_me = request.POST['remember_me']
        else:
            remember_me = False
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            if not remember_me:
                request.session.set_expiry(1209600)
            return redirect('index')
        else:
            messages.error(request, 'ئەزا نامى ياكى پارولدا خاتالىق بار')
            return render(request, 'login.html')
    return render(request, 'login.html')



def logout_view(request):
    logout(request)
    return redirect('login')

def author_detail(request,id):
    authors = get_object_or_404(Author,id=id)
    articles = Article.objects.filter(author=authors)
    context={
        'authors': authors,
        'articles': articles
    }
    return render(request,'author_detail.html',context=context)
