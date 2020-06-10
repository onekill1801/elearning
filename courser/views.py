from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import View
from .forms import *
from .models import *

def demo(request):
	content = {
		'subjects' : Subject.objects.all(),
		'tags' : Tag.objects.all(),
		'courses' : Course.objects.all()
	}
	return render(request, 'guest/list_course.html', content)
def demo1(request):
	return render(request, 'courserview/demo.html')

# Xu ly voi views moi
class C_Subject(View):
	def get(self ,request):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type']
				}
				# return render(request, 'loginview/course.html', content)
				return render(request, 'teacher/createSubject.html',content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all(),
					'type' : request.session['type']
				}
				return render(request, 'teacher/createSubject.html',content)
		except Exception as e:
			return render(request, '404.html') 
	def post(self ,request):
		sub_create = request.POST.get('sub_create', '')
		sub_del = request.POST.get('sub_del', '')
		sub_tag = request.POST.get('sub_tag', '')
		tag = request.POST.get('tag', '')
		tag_del = request.POST.get('tag_del', '')
		if sub_create:
			sub = Subject()
			sub.title = sub_create
			sub.save()
		elif sub_del:
			d_s = Subject.objects.filter(id=sub_del)
			d_s.delete()
		elif tag_del:
			d_t = Tag.objects.filter(id=tag_del)
			d_t.delete()
		elif sub_tag:
			if tag:
				t_s = Subject.objects.filter(id=sub_tag)[0]
				t = Tag()
				t.tag = tag
				t.subject = t_s
				t.save()
		else:
			print("x")
		return redirect('c_subject')

class C_Course(View):
	def get(self ,request):
		try:
			if request.session['type'] == '0':
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all(),
					'type' : request.session['type']
				}
				return render(request, 'teacher/createCourse.html',content)
		except Exception as e:
			return render(request, '404.html') 
	def post(self ,request):
		try:
			# import pdb; pdb.set_trace()
			# Tao 1 cai form o day
			cour = Course()
			cour.tag = Tag.objects.filter(id=request.POST.get('tag'))[0]
			cour.own_teacher = Teacher.objects.filter(id=request.session['id'])[0]
			cour.title = request.POST.get('title', '')
			cour.image = request.FILES['image']
			cour.value_old = request.POST.get('value_old', '')
			cour.value_new = request.POST.get('value_new', '')
			cour.save()
			return redirect('courseuser-view')
		except Exception as e:
			return render(request, '404.html') 
		
class C_CourseFull(View):
	def get(self ,request, c_id):
		try:
			if request.session['type'] == '0':
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'course' : Course.objects.filter(id=c_id)[0],
					'modules' : Module.objects.filter(course=Course.objects.filter(id=c_id)[0]),
					'type' : request.session['type']
				}
				return render(request, 'teacher/createCourseFull.html',content)
		except Exception as e:
			return render(request, '404.html') 

	def post(self ,request, c_id):
		# import pdb; pdb.set_trace()
		if request.POST.get('description'):
			course = Course.objects.filter(id=c_id)[0]
			course.description = request.POST.get('description')
			course.video_ins = request.POST.get('video_ins')
			course.you_need_know = request.POST.get('you_need_know')
			course.overview = request.POST.get('overview')
			course.save()
			return redirect('full_course', c_id=c_id ) 
		elif request.POST.get('module_lv0'):
			module = Module()
			module.title = request.POST.get('module_lv0')
			module.course = Course.objects.filter(id=c_id)[0]
			module.save()
			return redirect('full_course', c_id=c_id )
		elif request.POST.get('module_lv1'):
			module1 = Module()
			module1.course = Course.objects.filter(id=c_id)[0]
			module1.description = request.POST.get('module_lv1')
			module1.title = request.POST.get('par_module')
			module1.module_level = request.POST.get('par_module')
			module1.url = 'https://url.com'
			module1.save()
			return redirect('full_course', c_id=c_id )
		else:
			return render(request, '404.html') 

class S_CourseFull(View):
	def get(self ,request, c_id):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type'],
					'modules' : Module.objects.filter(course=Course.objects.filter(id=c_id)[0]),
					'course' : Course.objects.filter(id=c_id)[0]
				}
				return render(request, 'guest/showCourse.html',content)
		except Exception as e:
			content = {
				'course' : Course.objects.filter(id=c_id)[0],
				'modules' : Module.objects.filter(course=Course.objects.filter(id=c_id)[0])
			}
			return render(request, 'guest/showCourse.html',content)
		
	def post(self, request, c_id):
		return render(request, '404.html') 
		
class Guest_Course(View):
	def get(self ,request):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type'],
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all(),
					'courses' : Course.objects.all()

				}
				return render(request, 'guest/list_course.html',content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all(),
					'type' : request.session['type'],
					'courses' : Course.objects.all()

				}
				return render(request, 'guest/list_course.html',content)
		except Exception as e:
			content = {
				'subjects' : Subject.objects.all(),
				'tags' : Tag.objects.all(),
				'courses' : Course.objects.all()
			}
			return render(request, 'guest/list_course.html', content)
		
	def post(self, request, c_id):
		return render(request, '404.html') 
		
class HomeView(View):
	def get(self,request):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type'],
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all()
				}
				# return render(request, 'loginview/course.html', content)
				return render(request, 'guest/home.html',content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all(),
					'type' : request.session['type']
				}
				return render(request, 'guest/home.html',content)
		except Exception as e:
			content = {
				'subjects' : Subject.objects.all(),
				'tags' : Tag.objects.all()
			}
			return render(request, 'guest/home.html',  content)
		# return HttpResponse('Home View')


# Create your views here. phan cu
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



		