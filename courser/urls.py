from django.urls import path, include
from courser.views import *

urlpatterns = [
    path('demo/', demo , name='demo-view'),
    path('demo1/', demo1 , name='demo1-view'),
    # Dung demo
    path('home/', HomeView.as_view(), name='home-view'),

	path('open/', OpenSubjectView.as_view(),name='open_subject'),
	path('open/<int:pk>/', OpenCourserView.as_view(),name='open_course'),
	path('open/<int:pk>/<int:pk1>/', OpenModuleView.as_view(),name='open_module'),

    path('create/', CreateSubjectView.as_view(), name='create-subject'),
    path('create/<int:pk>/', CreateCourserView.as_view(), name='create-course'),
    path('create/<int:pk>/<int:pk1>/', CreateModuleView.as_view(), name='create-module'),

	path('edit/<int:pk>/', EditSubjectView.as_view(),name='edit_subject'),
	path('edit/<int:pk>/<int:pk1>/', EditCourserView.as_view(),name='edit_course'),
	path('edit/<int:pk>/<int:pk1>/<int:pk2>/', EditModuleView.as_view(),name='edit_module'),

	path('del/<int:pk>/', DelSubjectView.as_view(),name='del_subject'),
	path('del/<int:pk>/<int:pk1>', DelCourseView.as_view(),name='del_course'),
	path('del/<int:pk>/<int:pk1>/<int:pk2>/', DelModuleView.as_view(),name='del_module'),

#   Phan ung voi giao dien moi
    path('subject/', C_Subject.as_view(), name='c_subject'),
    path('course_c/', C_Course.as_view(), name='c_course'),
    path('course_full/<int:c_id>', C_CourseFull.as_view(), name='full_course'),
    path('l_course/', Guest_Course.as_view(), name='list_course'),
    path('course/<int:c_id>', S_CourseFull.as_view(), name='show_course'),

]
