from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('author/<int:id>', author_detail, name='author_detail'),
    path('dashboard/<int:id>', author_dashboard, name='dashboard'),
    path('register/', register_view, name='register'),
    path('add_article/', add_article, name='add_article'),
    path('update_article/<int:id>', update_article, name='update_article'),
    path('author_articles/<int:id>', author_articles_view, name='author_articles'),
    path('delete_article/<int:id>', delete_article, name='delete_article'),
]