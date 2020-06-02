from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import View
from .forms import CourseForm, ModuleForm , SubjectForm
from .models import Subject, Course, Module

# Create your views here.
class CourserView(View):
	def get(self, request):
		context = {
			'data': Subject.objects.all()
		}
		return render(request, 'courserview/list.html', context)
		# return HttpResponse('Get List Cousrses')
		
	def post(self, request):
		return HttpResponse('Post List Cousrses')

class CreateSubjectView(View):
	def get(self, request):
		form = SubjectForm()
		context = {
			'data': Subject.objects.all(),
			'form': form
		}
		return render(request, 'courserview/tcourse.html', context)
		# return HttpResponse('get request')
		
	def post(self, request):
		form = SubjectForm(request.POST)
		form1 = SubjectForm()
		if form.is_valid():
			subject_form = Subject()
			subject_form.title = request.POST.get('title', '')
			subject_form.slug = request.POST.get('slug', '')
			subject_form.save()
		# return HttpResponseRedirect('/')
		context = {
			'data': Subject.objects.all(),
			'form': form1
		}
		return render(request, 'courserview/tcourse.html', context)
		# return render(request, 'courserview/tcourse.html', {'form': form1})

class CreateModuleView(View):
	def get(self, request, pk):
		return HttpResponse('get request'+ pk)
		
	def post(self, request, pk):
		return HttpResponse('post request')

class CreateCourserView(View):
	def get(self, request, pk):
		data = Subject.objects.filter(id=pk)[0]
		form = CourseForm()
		content = {
			'form': form,
			'data' : data
		}
		return render(request, 'courserview/create.html', content)
		# return HttpResponse('get request')
		
	def post(self, request, pk):
		data = Subject.objects.filter(id=pk)[0]
		form = CourseForm(request.POST)
		if form.is_valid():
			subject_form = Course()
			subject_form.subject = data
			subject_form.title = request.POST.get('title', '')
			subject_form.slug = request.POST.get('slug', '')
			subject_form.overview = request.POST.get('title', '') +  request.POST.get('slug', '')
			subject_form.save()
			d_courses= Course.objects.all()
		return render(request, 'courserview/course_create.html', {'data': d_courses})
		# return HttpResponse('subject_form save')

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
		
class EditSubjectView(View):
	def get(self, request, pk):
		data = Subject.objects.filter(id=pk)
		# import pdb; pdb.set_trace()
		form1 = data[0]
		return render(request, 'courserview/edit.html', {'form': form1})
		# return HttpResponse('get request')
		
	def post(self, request, pk):
		data = Subject.objects.filter(id=pk)[0]
		data.title = request.POST.get('title', '')
		data.slug = request.POST.get('slug', '')
		data.save()
		form = SubjectForm()
		context = {
			'data': Subject.objects.all(),
			'form': form
		}
		return render(request, 'courserview/tcourse.html', context)
		# return HttpResponse('subject_form save')

class DelSubjectView(View):
	def get(self, request, pk):
		form1 = SubjectForm()
		data = Subject.objects.filter(id=pk)
		data.delete()
		form = SubjectForm()
		context = {
			'data': Subject.objects.all(),
			'form': form
		}
		return render(request, 'courserview/tcourse.html', context)
		# return HttpResponse('get request ' + pk)
		
	def post(self, request, pk):
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
		