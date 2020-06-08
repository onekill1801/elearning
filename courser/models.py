from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from datetime import datetime
from user.models import Teacher, Student

class Subject(models.Model):
    title = models.CharField(max_length=200,  unique=True)
    icon = models.ImageField(upload_to="course/subject", verbose_name="image_teacher",default="image/default.png", max_length=100)

    class Meta:
        abstract = False

    def __str__(self):
        return self.title

class Tag(models.Model):
    subject = models.ForeignKey(Subject,
                                related_name='tag',
                                on_delete=models.CASCADE)
    tag = models.CharField(max_length=200)
    tag_count = models.IntegerField(default=0, verbose_name="tag_count")
    class Meta:
        abstract = False

    def __str__(self):
        return self.tag
        
class Course(models.Model):
    tag = models.ForeignKey(Tag,
                            related_name='courses',
                            on_delete=models.CASCADE)
    own_teacher = models.ForeignKey(Teacher,
                                related_name='courses',
                                on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    image = models.ImageField(upload_to="course/courses", verbose_name="image", max_length=100)
    rate = models.IntegerField(default=0, verbose_name="rate")
    rate_student = models.IntegerField(default=0, verbose_name="rate_student")
    value_old = models.CharField(max_length=500)
    value_new = models.CharField(max_length=500)

    description = models.CharField(max_length=500)
    students = models.IntegerField(default=0, verbose_name="students")
    video_ins = models.CharField(max_length=500)
    you_need_know = models.CharField(max_length=3000, verbose_name="you_need_know", default='')
    overview = models.TextField()

    learn_times = models.CharField(max_length=500)
    module_nums = models.IntegerField(default=0, verbose_name="module_nums")

    click_nums = models.IntegerField(default=0, verbose_name="click_nums")
    fav_nums = models.IntegerField(default=0, verbose_name="fav_nums")
    teacher_tell = models.CharField(max_length=300, verbose_name="teacher_tell", default='')

    add_time = models.DateTimeField(default=datetime.now, verbose_name="add_time")
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "course"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

class Module(models.Model):
    course = models.ForeignKey(Course,
                               related_name='modules',
                               on_delete=models.CASCADE)
    module_level =  models.IntegerField(default=0)  
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    done = models.IntegerField(default=0)  
    url = models.CharField(max_length=500)

    def __str__(self):
        return self.title

    class Meta:
        abstract = False

class Content(models.Model):
    module = models.ForeignKey(Module,
                               related_name='contents',
                               on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType,
                                     on_delete=models.CASCADE,
                                     limit_choices_to={'model__in':(
                                     'text',
                                     'video',
                                     'image',
                                     'file')})
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = False

class ItemBase(models.Model):
    title = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title

class Text(ItemBase):
    content = models.TextField()

class File(ItemBase):
    file = models.FileField(upload_to='course/files')

class Image(ItemBase):
    file = models.FileField(upload_to='course/images')

class Video(ItemBase):
    url = models.URLField()

class Student_Course(models.Model):
    student = models.ForeignKey(Student,
                               related_name='student_course',
                               on_delete=models.CASCADE)
    course = models.ForeignKey(Course,
                               related_name='student_course',
                               on_delete=models.CASCADE)
    rate = models.IntegerField(default=0, verbose_name="rate")
    study_progress = models.CharField(max_length=500)