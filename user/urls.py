from django.contrib import admin
from django.urls import path, include
from user.views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login-view'),
    path('register/', RegisterView.as_view(), name='register-view'),
    path('profile/', ProfileView.as_view(), name='profile-view'),
    path('session/', session , name='session-view'),
    path('delsession/', delete_session_data , name='del_session'),
]
