from django.contrib import admin
from django.urls import path, include
from chat.views import *

urlpatterns = [
    # Phan 1
    path('chat/', chat , name='chat-view'),
    path('ajax/', ajax_chat , name='validate_nickname'),
    path('addComment/', ajax_chat , name='validate_nickname'),
    path('delComment/', ajax_chat , name='validate_nickname'),

]