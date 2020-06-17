from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import View
from .forms import *
from .models import *
from datetime import datetime

menuBar = {
	'menu_subjects' : Subject.objects.all(),
	'menu_tags' : Tag.objects.all()
}

def demo(request):
	# import pdb; pdb.set_trace()
	content = {
		'user' : Teacher.objects.filter(id=request.session['id'])[0],
		'subjects' : Subject.objects.all(),
		'tags' : Tag.objects.all(),
		'courses' : Course.objects.all(),
		'count' : Course.objects.all().count()
	}
	content.update(menuBar)
	return render(request, 'guest/list_course.html', content)
def demo1(request):
	return render(request, 'courserview/demo.html')
# Ham don xu ly get req cua teacher
def delete_course(request, c_id):
	try:
		if request.session['type'] == '0':
			t = Teacher.objects.filter(id=request.session['id'])[0]
			cour = Course.objects.filter(id=c_id)[0]
			cour.delete()
			for s_c in Student_Course.objects.filter(course=cour):
				s_c.delete()
			return redirect('courseuser-view')
		else:
			return render(request, '404.html') 
	except Exception as e:
		return render(request, '404.html') 
	
def delete_module(request, m_id):
	lv1_module = Module.objects.filter(id=m_id)[0]
	cour_id = lv1_module.course.id
	if lv1_module.module_level == 0:
		for x in Module.objects.filter(module_level=m_id):
			x.delete()
	lv1_module.delete()
	return redirect('full_course', c_id=cour_id)

def edit_module(request, m_id):
	lv_module = Module.objects.filter(id=m_id)[0]
	try:
		if request.session['type'] == '0':
			user = Teacher.objects.filter(id=request.session['id'])[0]
			content = {
				'user' : user,
				'course' : lv_module.course,
				'modules' : Module.objects.filter(course=lv_module.course),
				'type' : request.session['type'],
				'lv_module' : lv_module
			}
			if lv_module.module_level == 0:
				content.update({'lv0': '0'})
			else:
				content.update({'lv1': '0'})
			content.update(menuBar)
			return render(request, 'teacher/createCourseFull.html',content)
	except Exception as e:
		return render(request, '404.html') 

def update_module(request, m_id):
	lv_module = Module.objects.filter(id=m_id)[0]
	cour_id = lv_module.course.id
	lv_module.title = request.POST.get('module_lv0', str(request.POST.get('par_module')) + str(datetime.now()))
	if request.POST.get('par_module', ''):
		lv_module.description = request.POST.get('module_lv1', '')
		lv_module.module_level = request.POST.get('par_module', '')
	lv_module.save()
	return redirect('full_course', c_id=cour_id)
	
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
				content.update(menuBar)
				return render(request, 'teacher/createSubject.html',content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all(),
					'type' : request.session['type']
				}
				content.update(menuBar)
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
				content.update(menuBar)
				return render(request, 'teacher/createCourse.html',content)
		except Exception as e:
			return render(request, '404.html') 
	def post(self ,request):
		try:
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
				content.update(menuBar)
				return render(request, 'teacher/createCourseFull.html',content)
		except Exception as e:
			return render(request, '404.html') 

	def post(self ,request, c_id):
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
			module1.title = str(request.POST.get('par_module')) + str(datetime.now())
			module1.module_level = request.POST.get('par_module')
			module1.url = request.POST.get('url')
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
					'course' : Course.objects.filter(id=c_id)[0],
					'rate_course' : str(int(Course.objects.filter(id=c_id)[0].rate))
				}
				c_own = Course.objects.filter(id=c_id)[0]
				s_check = Student_Course.objects.filter(course=c_own).filter(student=user)
				if not s_check:
					content.update({'is_enroll': '0'})
				else:
					content.update({'is_enroll': '1'})
				content.update(menuBar)
				return render(request, 'student/sCourse.html',content)
		except Exception as e:
			content = {
				'course' : Course.objects.filter(id=c_id)[0],
				'modules' : Module.objects.filter(course=Course.objects.filter(id=c_id)[0])
			}
			content.update(menuBar)
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
					'courses' : Course.objects.all(),
					'count' : Course.objects.all().count()
				}
				content.update(menuBar)
				return render(request, 'guest/list_course.html',content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'subjects' : Subject.objects.all(),
					'tags' : Tag.objects.all(),
					'type' : request.session['type'],
					'courses' : Course.objects.all(),
					'count' : Course.objects.all().count()
				}
				content.update(menuBar)
				return render(request, 'guest/list_course.html',content)
		except Exception as e:
			content = {
				'subjects' : Subject.objects.all(),
				'tags' : Tag.objects.all(),
				'courses' : Course.objects.all(),
				'count' : Course.objects.all().count()
			}
			content.update(menuBar)
			return render(request, 'guest/list_course.html', content)
		
	def post(self, request, c_id):
		return render(request, '404.html') 
		
class Enrollment(View):
	def get(self, request, c_id, s_id):
		try:
			c_own = Course.objects.filter(id=c_id)[0]
			s_check = Student_Course.objects.filter(course=c_own).filter(student=Student.objects.filter(id=s_id)[0])
			if not s_check:
				c_own.students = c_own.students + 1
				c_own.save() 
				s_c = Student_Course()
				s_c.student = Student.objects.filter(id=s_id)[0]
				s_c.course = Course.objects.filter(id=c_id)[0]
				s_c.study_progress = "10%"
				s_c.save()
				return redirect('show_course', c_id=c_id )
			else:
				c_own.students = c_own.students - 1
				c_own.save() 
				s_check[0].delete()
				return redirect('show_course', c_id=c_id )
			# return HttpResponse('Save Success!!!')
		except Exception as e:
			return render(request, '404.html') 

	def post(self, request, c_id, s_id):
		return HttpResponse('Get List Cousrses')

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
				content.update(menuBar)
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
				content.update(menuBar)
				return render(request, 'guest/home.html',content)
		except Exception as e:
			content = {
				'subjects' : Subject.objects.all(),
				'tags' : Tag.objects.all()
			}
			content.update(menuBar)
			return render(request, 'guest/home.html',  content)
		# return HttpResponse('Home View')

# Phan ham don xu ly su kien
class RateCourse(View):
	def get(self, request, c_id):
		return HttpResponse('Get List Cousrses')
	def post(self, request, c_id):
		try:
			if request.session['type'] == '1':
				# Hoc vien
				s = Student.objects.filter(id=request.session['id'])[0]
				# Khoa hoc
				cour = Course.objects.filter(id=c_id)[0]
				# Bang khoa hoc va hoc vien
				s_c = Student_Course.objects.filter(student=s).filter(course=cour)[0]
				s_c.rate = request.POST.get('rate')
				s_c.save()
				# Tinh toan phan danh gia khoa hoc
				cal_rate = 0 
				for rate_c in Student_Course.objects.filter(course=cour):
					cal_rate = cal_rate + int(rate_c.rate)
				cal_rate = cal_rate/len(Student_Course.objects.filter(course=cour))
				cour.rate = cal_rate
				cour.rate_student = len(Student_Course.objects.filter(course=cour))
				cour.save()
				# Tinh toan xong luu vao database
				return redirect('courseuser-view')
			else:
				return render(request, '404.html') 
		except Exception as e:
			return render(request, '404.html') 



		