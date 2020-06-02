from django import forms
from .models import Subject

class CourseForm(forms.Form):
	title = forms.CharField(required=True)
	slug = forms.SlugField(required=True)

class ModuleForm(forms.Form):   
	# subject = forms.CharField(required=True). 
	title = forms.CharField(required=True)
	slug = forms.SlugField(required=True)
	overview = forms.CharField()
