from django.urls import path
from .views import *

urlpatterns = [
    path('',index,name='index'),
    path('category/<int:id>',category_detail,name='category_detail'),
    path('article/<int:id>',article_detail,name='article_detail')
]
