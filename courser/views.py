from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import View
from .forms import *
from .models import *

# Create your views here.
class OpenSubjectView(View):
	def get(self, request):
		context = {
			'data': Subject.objects.all(),
			'form': SubjectForm()
		}
		return render(request, 'courserview/l_subject.html', context)
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
		return render(request, 'courserview/l_subject.html', context)
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
		return render(request, 'courserview/l_subject.html', context)
		# return render(request, 'courserview/tcourse.html', {'form': form1})

class EditSubjectView(View):
	def get(self, request, pk):
		data = Subject.objects.filter(id=pk)
		# import pdb; pdb.set_trace()
		form1 = data[0]
		context = {
			'data': Subject.objects.all(),
			'form': form1
		}
		return render(request, 'courserview/l_subject.html', context)
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
		return render(request, 'courserview/l_subject.html', context)
		# return HttpResponse('subject_form save')

class DelSubjectView(View):
	def get(self, request, pk):
		data = Subject.objects.filter(id=pk)
		data.delete()
		form = SubjectForm()
		context = {
			'data': Subject.objects.all(),
			'form': form
		}
		return render(request, 'courserview/l_subject.html', context)
		# return HttpResponse('get request ' + pk)
		
	def post(self, request, pk):
		return HttpResponse('post request')


class OpenCourserView(View):
	def get(self,request, pk):
		data = Course.objects.filter(subject=pk)
		form = CourseForm()
		content = {
			'form': form,
			'data' : data,
			'pk': pk
		}
		return render(request, 'courserview/l_course.html', content)
		# return HttpResponse('Home View')
	def post(self,request, pk):
		return HttpResponse('Home View')

class CreateCourserView(View):
	def get(self, request, pk):
		# data = Subject.objects.filter(id=pk)[0]
		# form = CourseForm()
		# content = {
		# 	'form': form,
		# 	'data' : data
		# }
		# return render(request, 'courserview/l_course.html', content)
		return HttpResponse('get request')
		
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
			d_courses= Course.objects.filter(subject=Subject.objects.filter(id=pk)[0])
		content = {
			'form': CourseForm(),
			'data' : d_courses,
			'pk': pk
		}
		return render(request, 'courserview/l_course.html', content)
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

class DelCourseView(View):
	def get(self, request, pk, pk1):
		data = Course.objects.filter(id=pk1)
		data.delete()
		form = CourseForm()
		content = {
			'form': form,
			'data' : Course.objects.filter(subject=pk),
			'pk': pk
		}
		return render(request, 'courserview/l_course.html', content)
		# return HttpResponse('get request ')
		
	def post(self, request, pk, pk1):
		return HttpResponse('post request')


class OpenModuleView(View):
	def get(self,request, pk ,pk1):
		data = Module.objects.filter(course=pk1)
		form = ModuleForm()
		content = {
			'form': form,
			'data' : data,
			'pk': pk,
			'pk1': pk1
		}
		return render(request, 'courserview/l_module.html', content)
		# return render(request, 'courserview/l_module.html', { 'data':data })
		# return HttpResponse('Home View')
	
class CreateModuleView(View):
	def get(self, request, pk , pk1):
		return HttpResponse('get request')
		
	def post(self, request, pk , pk1):
		# import pdb; pdb.set_trace()
		data = Course.objects.filter(id=pk1)[0]
		form = ModuleForm(request.POST)
		form1 = ModuleForm()
		if form.is_valid():
			m_data = Module()
			m_data.course = data
			m_data.title = request.POST.get('title', '')
			m_data.description = request.POST.get('description', '')
			m_data.save()
			content = {
				'form': form1,
				'data' : Module.objects.filter(course=pk1),
				'pk': pk,
				'pk1': pk1
			}
		return render(request, 'courserview/l_module.html', content)
		# return HttpResponse('post request')

class EditModuleView(View):
	def get(self, request):
		return HttpResponse('get request ')
		
	def post(self, request):
		return HttpResponse('post request')

class DelModuleView(View):
	def get(self, request, pk , pk1, pk2):
		data = Module.objects.filter(id=pk2)
		data.delete()
		content = {
			'form': ModuleForm(),
			'data' : Module.objects.filter(course=pk1),
			'pk': pk,
			'pk1': pk1
		}
		return render(request, 'courserview/l_module.html', content)
		# return HttpResponse('get request ')
		
	def post(self, request, pk , pk1, pk2):
		return HttpResponse('post request')


class HomeView(View):
	def get(self,request):
		url = 'courserview/home.html'
		return render(request, url)
		# return HttpResponse('Home View')


		