from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404


def index(request):
    if request.user.is_authenticated:
        author = get_object_or_404(Author,username=request.user.username)
    else:
         author = None
    context = {
        'articles': Article.objects.all()[:6],
        'categorys': Category.objects.all(),
        'author': author

    }
    return render(request, 'index.html', context=context)

def category_detail(request,id):
    categorys = get_object_or_404(Category,id=id)
    context={
        'category':categorys,
        'articles':Article.objects.filter(category=categorys),
        'r_article':Article.objects.filter(category=categorys)[:3]
    }
    return render(request,'category_detail.html',context=context)



def article_detail(request,id):
    articles = get_object_or_404(Article,id=id)
    context={
        'articles': articles,
        'category':Category.objects.filter(article=articles),
    }
    return render(request,'article_detail.html',context=context)