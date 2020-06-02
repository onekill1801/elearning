from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponse
from user.models import UserModel
from .forms import LoginForm, RegisterForm
# import pdb
# Create your views here.

class LoginView(View):
	def get(self, request):
		# register_form = UserForm()
		# context = {
		# 	# 'files': "images/169033.jpg",
		# 	'register_form':register_form
		# }
		return render(request, 'loginview/login.html')
		# return HttpResponse('get request')
		
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
		# return HttpResponse("Get RegisterView")

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