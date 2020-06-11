from django.contrib import admin
from django.urls import path, include
from user.views import *

urlpatterns = [
    # Phan 1
    path('login/', LoginView.as_view(), name='login-view'),
    path('register/', RegisterView.as_view(), name='register-view'),
    # chua lam reset_pass/
    path('reset_pass/', ResetPassView.as_view(), name='reset_pass-view'), 
    path('change_pass/', ChangePassView.as_view(), name='change_pass-view'), 
    path('logout/', logout, name='logout-view'),

	# Phan 2
    path('profile/', ProfileView.as_view(), name='profile-view'),
    path('course/', CourseView.as_view(), name='courseuser-view'),

	# Phan test
]
