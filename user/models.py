from django.db import models
from datetime import datetime

# Create your models here.
class Account(models.Model):
    user_name = models.CharField(max_length=50, verbose_name="user_name")
    pass_word = models.CharField(max_length=50, verbose_name="pass_word")
    email = models.CharField(max_length=50, verbose_name="email")
    fullname = models.CharField(max_length=50, verbose_name="fullname")
    address = models.CharField(max_length=100, default="")
    last_login = models.DateTimeField(null=True)
    class Meta:
        abstract = True

class Teacher(Account):
    work_years = models.IntegerField(default=0, verbose_name="work_years")
    work_company = models.CharField(max_length=50, verbose_name="work_company")
    work_position = models.CharField(max_length=50, verbose_name="work_position")
    points = models.CharField(max_length=50, verbose_name="points")
    click_nums = models.IntegerField(default=0, verbose_name="click_nums")
    fav_nums = models.IntegerField(default=0, verbose_name="fav_nums")
    add_time = models.DateTimeField(default=datetime.now)
    age = models.IntegerField(default=18, verbose_name="age")
    image = models.ImageField(upload_to="user/teacher", verbose_name="image_teacher",default="user/teacher/default.jpg", max_length=100)

    class Meta:
        verbose_name = "teacher"
        verbose_name_plural = verbose_name

    def get_course_nums(self):
        return self.course_set.all().count()

    def __str__(self):
        return self.user_name

class Student(Account):
    birday = models.DateField(verbose_name="birday", null=True, blank=True)
    gender = models.CharField(max_length=10, choices=(("male", "Nam"), ("female", "Nu")), default="male")
    mobile = models.CharField(max_length=11, null=True, blank=True)
    image = models.ImageField(upload_to="user/student", default="user/student/default.jpg", max_length=100)

    class Meta:
        verbose_name = "student"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user_name
