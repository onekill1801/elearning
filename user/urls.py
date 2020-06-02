from django.contrib import admin
from django.urls import path, include
from user.views import LoginView, RegisterView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login-view'),
    path('register/', RegisterView.as_view(), name='register-view'),
]
