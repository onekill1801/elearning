from django.shortcuts import render, redirect
from django.views.generic.base import View
from django.http import HttpResponse
from user.models import *
from courser.models import *
from .forms import *
import hashlib

# Create your views here.
def make_password(password):
	return hashlib.md5(str(password).encode('utf-8')).hexdigest()

menuBar = {
	'menu_subjects' : Subject.objects.all(),
	'menu_tags' : Tag.objects.all()
}
#  Phan tren la demo
def logout(request):
	del request.session['id']
	del request.session['type']
	return redirect('/')
	# return HttpResponse("Logout")

class LoginView(View):
	def get(self, request):
		return render(request, 'account/login.html')
		
	def post(self, request):
		# import pdb; pdb.set_trace()
		form = LoginForm(request.POST)
		if form.is_valid():
			userT = Teacher.objects.filter(user_name=request.POST.get('user_name'))
			userS = Student.objects.filter(user_name=request.POST.get('user_name'))
			if userS:
				id_S = Student.objects.filter(user_name=request.POST.get('user_name'))[0].id
				passS = Student.objects.filter(user_name=request.POST.get('user_name'))[0].pass_word
				# if passS == request.POST.get('pass_word'):
				if passS == make_password(request.POST.get('pass_word')):
					request.session['id'] = id_S
					request.session['type'] = '1'
					return redirect('/')
				else:
					content = {'messge_error' : 'User or pass wrong!!!'}
					return render(request, 'account/login.html', content)
			elif userT:
				id_T = Teacher.objects.filter(user_name=request.POST.get('user_name'))[0].id
				passT = Teacher.objects.filter(user_name=request.POST.get('user_name'))[0].pass_word
				# if passT == request.POST.get('pass_word'):
				if passT == make_password(request.POST.get('pass_word')):
					request.session['id'] = id_T
					request.session['type'] = '0'
					return redirect('/')
				else:
					content = {'messge_error' : 'User or pass wrong!!!'}
					return render(request, 'account/login.html', content)
			else:
				content = {'messge_error' : 'User or pass wrong!!!'}
				return render(request, 'account/login.html', content)
		else:
			return HttpResponse('500 Internal Server Error')

class RegisterView(View):
	def get(self, request):
		return render(request, 'account/register.html')

	def post(self, request):
		form = RegisterForm(request.POST)
		if form.is_valid():
			if request.POST.get('password1', '') == request.POST.get('password2', ''):
				if request.POST.get('type_user', '') == '0':
					user = Teacher.objects.filter(user_name=request.POST.get('user_name'))
					user_email = Teacher.objects.filter(email=request.POST.get('email'))
					if not user:
						if not user_email:
							userTeacher = Teacher()
							userTeacher.user_name = request.POST.get('user_name', '')
							# userTeacher.pass_word = request.POST.get('password1', '')
							userTeacher.pass_word = make_password(request.POST.get('password1', ''))
							userTeacher.email = request.POST.get('email', '')
							userTeacher.save()
							context = {'messge': 'Account Success'}
						else:
							context = {'messge_error_email': 'Email da ton tai'}
					else:
						context = {'messge_error_user': 'User da ton tai'}
				else:
					user = Student.objects.filter(user_name=request.POST.get('user_name'))
					user_email = Student.objects.filter(email=request.POST.get('email'))
					if not user:
						if not user_email:
							userStudent = Student()
							userStudent.user_name = request.POST.get('user_name', '')
							# userStudent.pass_word = request.POST.get('password1', '')
							userStudent.pass_word = make_password(request.POST.get('password1', ''))
							userStudent.email = request.POST.get('email', '')
							userStudent.save()
							context = {'messge': 'Account Success'}
						else:
							context = {'messge_error_email': 'Email da ton tai'}
					else:
						context = {'messge_error_user': 'User da ton tai'}
				return render(request, 'account/register.html', context)
			else:
				context = {'messge_error_pass': 'Error Password'}
				return render(request, 'account/register.html', context)
		else:
			return HttpResponse("500 Internal Server Error ")

class CourseView(View):
	def get(self, request):
		try:
			if request.session['type'] == '1':
				arr = []
				user = Student.objects.filter(id=request.session['id'])[0]
				for x in Student_Course.objects.filter(student=user):
					arr.append(x.course.id)
				content = {
					'user' : user,
					'type' : request.session['type'],
					# 'student_course' : Student_Course.objects.filter(student=user),
					'courses' : Course.objects.filter(id__in=arr)
				}
				content.update(menuBar)			
				return render(request, 'student/courseS.html', content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type'],
					'courses' : Course.objects.filter(own_teacher=request.session['id'])
				}
				content.update(menuBar)
				return render(request, 'teacher/courseT.html', content)
		except Exception as e:
			return render(request, '404.html') 

	def post(self, request):
		return HttpResponse("Post ProdfileView")

class ProfileView(View):
	def get(self, request):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type']
				}
				content.update(menuBar)
				return render(request, 'student/profileS.html', content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type']
				}
				content.update(menuBar)
				return render(request, 'teacher/profileT.html', content)
		except Exception as e:
			return render(request, '404.html')

	def post(self, request):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				user.fullname = request.POST.get('fullname', '')
				user.address = request.POST.get('address', '')
				user.gender = request.POST.get('gender', '')
				user.birday = request.POST.get('birday', '')
				user.mobile = request.POST.get('mobile', '')
				try:
					user.image = request.FILES['image']
				except Exception as e:
					print("request.FILES['image'] is null")
				user.save()
				content = {
					'messge' : 'Cap nhat thanh cong!!!'
				}
				return redirect('profile-view')
				# return render(request, 'student/profileS.html', content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				user.fullname = request.POST.get('fullname', '')
				user.address = request.POST.get('address', '')
				user.work_years = request.POST.get('work_years', '')
				user.work_company = request.POST.get('work_company', '')
				user.work_position = request.POST.get('work_position', '')
				user.age = request.POST.get('age', '')
				try:
					user.image = request.FILES['image']
				except Exception as e:
					print("request.FILES['image'] is null")
				user.save()
				content = {
					'messge' : 'Cap nhat thanh cong!!!'
				}
				return redirect('profile-view')
				# return render(request, 'teacher/profileT.html', content)
		except Exception as e:
			return render(request, '404.html')

class ResetPassView(View):
	def get(self, request):
		return render(request, 'account/reset_pass.html')
	def post(self, request):
		return render(request, 'account/reset_pass.html')

class ChangePassView(View):
	def get(self, request):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type']
				}
				content.update(menuBar)
				return render(request, 'account/change_password.html', content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type']
				}
				content.update(menuBar)
				return render(request, 'account/change_password.html', content)
		except Exception as e:
			return render(request, '404.html')
	def post(self, request):
		try:
			if request.session['type'] == '1':
				user = Student.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type']
				}
				if user.pass_word == request.POST.get('oldpassword'):
					if request.POST.get('password') == request.POST.get('repassword'):
						# user.pass_word = request.POST.get('password')
						user.pass_word = make_password(request.POST.get('user_name'))
						user.save()
						content.update({'messge': 'Change pass success!!!'})
					else:
						content.update({'messge': 'Change pass fail!!!'})
					content.update(menuBar)
				return render(request, 'account/change_password.html', content)
			else:
				user = Teacher.objects.filter(id=request.session['id'])[0]
				content = {
					'user' : user,
					'type' : request.session['type']
				}
				if user.pass_word == request.POST.get('oldpassword'):
					if request.POST.get('password') == request.POST.get('repassword'):
						# user.pass_word = request.POST.get('password')
						user.pass_word = make_password(request.POST.get('user_name'))
						user.save()
						content.update({'messge': 'Change pass success!!!'})
					else:
						content.update({'messge': 'Change pass fail!!!'})
					content.update(menuBar)
				return render(request, 'account/change_password.html', content)
		except Exception as e:
			return render(request, '404.html')