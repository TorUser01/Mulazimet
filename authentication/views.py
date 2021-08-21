from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.forms import ModelForm
from .models import *


class LoginForm(ModelForm):
    class Meta:
        model = Author
        fields = ['username','password']




def login(request):
    return render(request, 'login.html')

def user(request):
    author = get_object_or_404(Author,username=request.user.username)
    context = {
        'author': author
    }
    return render(request,'base.html',context=context)
