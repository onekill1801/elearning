from django.urls import path, include
from courser.views import (
	CourserView,
	CreateCourserView,
	HomeView,
	EditCourserView,
	DeleteCourserView,
	CreateModulerView,
	SCourserView,
	TCourserView
)

urlpatterns = [
    # path('home/', HomeView.as_view(), name='home-view'),
    path('', CourserView.as_view(), name='courser-view'),
    path('listcourses/', CourserView.as_view(), name='courser-view'),
    path('scourses/', SCourserView.as_view(), name='scourses-view'),
    path('tcourses/', TCourserView.as_view(), name='tcourses-view'),
    path('create/', CreateCourserView.as_view(), name='create-view'),
    path('createmodule/', CreateModulerView.as_view(), name='createmodule-view'),
    path('edit/', EditCourserView.as_view(), name='edit-view'),
    path('delete/', DeleteCourserView.as_view(), name='del-view'),
]
