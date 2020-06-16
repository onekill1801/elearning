from django.db import models
from user.models import Teacher, Student
from courser.models import Course

# Create your models here.
class Comment(models.Model):
    student = models.ForeignKey(Student,
                                related_name='courses',
                                on_delete=models.CASCADE)
    course = models.ForeignKey(Course,
                                related_name='courses',
                                on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        abstract = True


class Question(models.Model):
    teacher = models.ForeignKey(Teacher,
                                related_name='courses',
                                on_delete=models.CASCADE)
    course = models.ForeignKey(Student,
                                related_name='courses',
                                on_delete=models.CASCADE)
    question = models.CharField(max_length=500)
    resultFirst = models.CharField(max_length=500)
    resultFirst = models.CharField(max_length=500)
    resultFirst = models.CharField(max_length=500)
    resultFirst = models.CharField(max_length=500)
    class Meta:
        abstract = True