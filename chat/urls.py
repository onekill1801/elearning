from django.contrib import admin
from django.urls import path, include
from chat.views import *

urlpatterns = [
    path('addComment/', addComment , name='addComment_name'),
    path('delComment/', delComment , name='delComment_name'),
]