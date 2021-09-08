from django.shortcuts import render, redirect, get_object_or_404, reverse, HttpResponse
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth import update_session_auth_hash
from django.forms import ModelForm
from django import forms
from blog.models import *


class LoginForm(ModelForm):
    class Meta:
        model = Author
        fields = ['username', 'password']
        exclude = []


class RegisterForm(ModelForm):
    class Meta:
        model = Author
        fields = ['username', 'password']


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
    if not request.user.is_authenticated:

        return render(request, 'login.html')
    else:
        return redirect("index")


def register_view(request):
    if request.method == "POST":
        if request.method == "POST":
            form = RegisterForm(request.POST or None)

            if form.is_valid():
                obj = form.save(commit=False)
                obj.set_password(form.cleaned_data["password"])
                obj.save()
                messages.success(request, "مۇۋەپپىقيەتلىك بولدى")
                return redirect('login')
            else:
                messages.error(request, form.errors)
            return redirect('register')
    return render(request, 'register.html')



class ChangePassword(forms.ModelForm):
    class Meta:
        fields = ['password']

def change_password(request):
    if request.method == 'POST':
        form = ChangePassword(request.user, request.POST or None)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return redirect('change_password')
        else:
            messages.error(request, 'Please correct the error below.')


def logout_view(request):
    logout(request)
    return redirect('login')












def author_detail(request, id):
    if request.user.is_authenticated:
        current_author = get_object_or_404(Author, username=request.user.username)
    else:
        current_author = None

    authors = get_object_or_404(Author, id=id)
    articles = Article.objects.filter(author=authors)
    context = {
        'authors': authors,
        'articles': articles,
        'current_author': current_author
    }
    return render(request, 'author_detail.html', context=context)


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Author
        fields = ['username', 'age', 'languages', 'location', 'image', 'skills', 'phone', 'work', 'experience',
                  'education', 'bio', 'short_bio', ]


def author_dashboard(request, id):
    authors = get_object_or_404(Author, id=id)
    articles = Article.objects.filter(author=authors)
    this_author = get_object_or_404(Author, username=request.user.username)
    context = {
        'authors': authors,
        'articles': articles,
        'this_author': this_author,
        'languages': Languages.objects.all(),
        'skills': Skills.objects.all(),
        'tags': Tags.objects.all(),
        'educations': Education.objects.all(),

    }

    if request.method == 'POST':
        form = ProfileForm(request.POST or None, request.FILES or None, instance=authors)
        if form.is_valid():
            form.languages = request.POST.getlist('languages')
            profile_form = form.save(commit=False)
            profile_form.save()
            return redirect(reverse('dashboard', kwargs={"id": authors.id}))
        else:
            print(form.errors)
    return render(request, 'dashboard/profile.html', context=context)


def author_articles_view(request, id):
    authors = get_object_or_404(Author, id=id)
    author_articles = Article.objects.filter(author_id=id).order_by('-datetime')
    context = {
        'author_articles': author_articles,
        'authors': authors,
    }
    return render(request, 'dashboard/author_articles.html', context=context)


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'
        exclude = ['author', 'content']


class ArticleContentForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ArticleContentForm, self).__init__(*args, **kwargs)
        self.fields['content'].label = ''

    class Meta:
        model = Article
        fields = ['content', ]
        exclude = ['time', ]


def add_article(request):
    authors = get_object_or_404(Author, username=request.user.username)
    article_form = ArticleForm(request.POST or None, request.FILES or None)
    content_form = ArticleContentForm(request.POST or None, request.FILES or None)
    context = {
        'authors': authors,
        'categorys': Category.objects.all(),
        'time_types': TimeType.objects.all(),
        'content_form': content_form
    }

    if request.method == 'POST':
        if article_form.is_valid() and content_form.is_valid():
            form = article_form.save(commit=False)
            form.author = get_object_or_404(Author, username=request.user.username)
            form.content = request.POST['content']
            form.save()
            return redirect(reverse('author_articles', kwargs={"id": authors.id}))
        else:
            print(article_form.errors)
            print(content_form.errors)
    return render(request, 'dashboard/add_article.html', context=context)


def update_article(request, id):
    article = get_object_or_404(Article, id=id)
    authors = get_object_or_404(Author, username=request.user.username)
    content_form = ArticleContentForm(request.POST or None, request.FILES or None, instance=article)
    context = {
        'authors': authors,
        'categorys': Category.objects.all(),
        'time_types': TimeType.objects.all(),
        'article': article,
        'content_form': content_form
    }

    if request.method == 'POST':
        article_update_form = ArticleForm(request.POST or None, request.FILES or None, instance=article)
        if article_update_form.is_valid():
            form = article_update_form.save(commit=False)
            form.author = get_object_or_404(Author, username=request.user.username)
            form.content = request.POST['content']
            form.save()
            return redirect(reverse('author_articles', kwargs={"id": authors.id}))
        else:
            print(article_update_form.errors)
    return render(request, 'dashboard/update_article.html', context=context)


def delete_article(request, id):
    obj = get_object_or_404(Article, id=id)
    authors = get_object_or_404(Author, username=request.user.username)

    if obj.author == authors:
        obj.delete()
        return redirect(reverse('author_articles', kwargs={"id": authors.id}))
    else:
        return redirect('index')
