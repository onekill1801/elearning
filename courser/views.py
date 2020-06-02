from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic.base import View
from .forms import CourseForm, ModuleForm
from .models import Subject, Course

# Create your views here.
class CourserView(View):
	def get(self, request):
		context = {
			'data': Subject.objects.all()
		}
		return render(request, 'courserview/list.html', context)
		# return HttpResponse('Get List Cousrses')
		
	def post(self, request):
		# form = LoginForm(request.POST)
		# if form.is_valid():
		# 	user_name = request.POST.get('user_name', '')
		# 	user = UserModel.objects.filter(user_name=user_name)
		# 	# pdb.set_trace()
		# 	if len(user) == 1:
		# 		context = {'messge': 'Login Sussess'}
		# 		return render(request, 'loginview/login.html', context)
		# 	else:
		# 		context = {'messge': 'Login Fail'}
		# 		return render(request, 'loginview/login.html', context)
		# else:
			# return HttpResponse('post request')
		return HttpResponse('Post List Cousrses')

class CreateCourserView(View):
	def get(self, request):
		form = CourseForm()
		return render(request, 'courserview/create.html', {'form': form})
		# return HttpResponse('get request')
		
	def post(self, request):
		form = CourseForm(request.POST)
		if form.is_valid():
			subject_form = Subject()
			subject_form.title = request.POST.get('title', '')
			subject_form.slug = request.POST.get('slug', '')
			subject_form.save()
		return HttpResponse('subject_form save')

class EditCourserView(View):
	def get(self, request):
		return HttpResponse('get request')
		
	def post(self, request):
		form = CourseForm(request.POST)
		if form.is_valid():
			subject_form = Course()
			subject_form.subject = Subject.objects.filter(id=request.POST.get('subject', ''))[0]
			subject_form.title = request.POST.get('title', '')
			subject_form.slug = request.POST.get('slug', '')
			subject_form.overview = request.POST.get('overview', '')
			subject_form.save()
		return HttpResponse('subject_form save')
		# return HttpResponse('post request')
		
class DeleteCourserView(View):
	def get(self, request):
		return HttpResponse('get request')
		
	def post(self, request):
		return HttpResponse('post request')

class CreateModulerView(View):
	def get(self, request):
		form = ModuleForm()
		context = {
			'data': Subject.objects.all(),
			'form': form
		}
		return render(request, 'courserview/create.html', context)
		# return HttpResponse('get request')
		
	def post(self, request):
		form = CourseForm(request.POST)
		if form.is_valid():
			subject_form = Course()
			subject_form.subject = Subject.objects.filter(id=request.POST.get('subject', ''))[0]
			subject_form.title = request.POST.get('title', '')
			subject_form.slug = request.POST.get('slug', '')
			subject_form.overview = request.POST.get('overview', '')
			subject_form.save()
		return HttpResponse('subject_form save')
		# return HttpResponse('post request')

class HomeView(View):
	def get(self,request):
		return render(request, 'courserview/home.html')
		# return HttpResponse('Home View')

class SCourserView(View):
	def get(self, request):
		return render(request, 'courserview/scourse.html')

class TCourserView(View):
	def get(self, request):
		return render(request, 'courserview/tcourse.html')
		