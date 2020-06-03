from django.urls import path, include
from courser.views import (
	CourserView,
	CreateCourserView,
	HomeView,
	EditCourserView,
	CreateModulerView,
	SCourserView,
	TCourserView,
	CreateSubjectView,
	DelSubjectView,
	EditSubjectView,
	CreateModuleView,
	OpenCourserView,
	OpenModuleView
)

urlpatterns = [
    # path('home/', HomeView.as_view(), name='home-view'),
    path('', CourserView.as_view(), name='courser-view'),
    path('listcourses/', CourserView.as_view(), name='courser-view'),
    path('scourses/', SCourserView.as_view(), name='scourses-view'),
    path('tcourses/', CreateSubjectView.as_view(), name='tcourses-view'),
    path('create/', CreateCourserView.as_view(), name='create-view'),
    path('createmodule/', CreateModulerView.as_view(), name='createmodule-view'),
    path('edit/', EditCourserView.as_view(), name='edit-view'),
    # path('delete/', DeleteCourserView.as_view(), name='del-view'),
	path('<pk>/del/', DelSubjectView.as_view(),name='course_del'),
	path('<pk>/edit/', EditSubjectView.as_view(),name='course_edit'),
	path('<pk>/module/', CreateCourserView.as_view(),name='course_module'),

	path('<pk>/open/', OpenCourserView.as_view(),name='open_course'),
	path('<pk>/open/', OpenModuleView.as_view(),name='open_module'),

	path('module/<str:module_id>/',
		CreateModuleView.as_view(),
		name='module_content_create'),

]
