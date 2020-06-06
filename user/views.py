from django.shortcuts import render, redirect
from django.views.generic.base import View
from django.http import HttpResponse
from user.models import UserModel
from .forms import LoginForm, RegisterForm
# import pdb
# Create your views here.

def delete_session_data(request):
	del request.session['username']
	if request.session['username']:
		return HttpResponse('session!')
	else:
		return render(request, 'loginview/session.html')

def session(request):
	request.session['username'] = '20'
	request.session['type'] = '1'
	# return redirect('/user/')
	# if request.session.test_cookie_worked():
		# required=Trueequest.session.delete_test_cookie()
		# 
		# request.session['username'] = '20'
		# print(request.session.get('user_id'))
		# return HttpResponse('enable cookie' + request.session['username'])
	# else:
		# request.session.set_test_cookie()
		# return HttpResponse('Please enable cookie')
		# messages.error(request, 'Please enable cookie')
	return render(request, 'loginview/session.html')
	# # return render(request, 'home/home.html')
	# return HttpResponse('session!')


class LoginView(View):
	def get(self, request):
		return render(request, 'loginview/login.html')
		
	def post(self, request):
		form = LoginForm(request.POST)
		import pdb; pdb.set_trace()
		if form.is_valid():
			user_name = request.POST.get('user_name', '')
			user = UserModel.objects.filter(user_name=user_name)
			# pdb.set_trace()
			if len(user) == 1:
				context = {'messge': 'Login Sussess'}
				return render(request, 'loginview/login.html', context)
			else:
				context = {'messge': 'Login Fail'}
				return render(request, 'loginview/login.html', context)
		else:
			return HttpResponse('post request')

class RegisterView(View):
	def get(self, request):
		return render(request, 'loginview/register.html')

	def post(self, request):
		form = RegisterForm(request.POST)
		if form.is_valid():
			user = UserModel()
			user.user_name = request.POST.get('user_name', '')
			user.pass_word = request.POST.get('pass_word', '')
			user.type_user = request.POST.get('type_user', '')
			user.save()
			context = {'messge': 'Register Sussess'}
			return render(request, 'loginview/register.html', context)
		else:
			return HttpResponse("Post RegisterView")

class ProfileView(View):
	def get(self, request):
		return render(request, 'loginview/profile.html')

	def post(self, request):
		# form = RegisterForm(request.POST)
		# if form.is_valid():
		# 	user = UserModel()
		# 	user.user_name = request.POST.get('user_name', '')
		# 	user.pass_word = request.POST.get('pass_word', '')
		# 	user.type_user = request.POST.get('type_user', '')
		# 	user.save()
		# 	context = {'messge': 'Register Sussess'}
		# 	return render(request, 'loginview/profile.html', context)
		# else:
		return HttpResponse("Post ProfileView")