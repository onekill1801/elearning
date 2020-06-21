# Generated by Django 3.0.6 on 2020-06-21 22:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=50, verbose_name='user_name')),
                ('pass_word', models.CharField(max_length=50, verbose_name='pass_word')),
                ('email', models.CharField(max_length=50, verbose_name='email')),
                ('fullname', models.CharField(max_length=50, verbose_name='fullname')),
                ('address', models.CharField(default='', max_length=100)),
                ('last_login', models.DateTimeField(null=True)),
                ('birday', models.DateField(blank=True, null=True, verbose_name='birday')),
                ('gender', models.CharField(choices=[('male', 'Nam'), ('female', 'Nu')], default='male', max_length=10)),
                ('mobile', models.CharField(blank=True, max_length=11, null=True)),
                ('image', models.ImageField(default='user/student/default.jpg', upload_to='user/student')),
            ],
            options={
                'verbose_name': 'student',
                'verbose_name_plural': 'student',
            },
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=50, verbose_name='user_name')),
                ('pass_word', models.CharField(max_length=50, verbose_name='pass_word')),
                ('email', models.CharField(max_length=50, verbose_name='email')),
                ('fullname', models.CharField(max_length=50, verbose_name='fullname')),
                ('address', models.CharField(default='', max_length=100)),
                ('last_login', models.DateTimeField(null=True)),
                ('work_years', models.IntegerField(default=0, verbose_name='work_years')),
                ('work_company', models.CharField(max_length=50, verbose_name='work_company')),
                ('work_position', models.CharField(max_length=50, verbose_name='work_position')),
                ('points', models.CharField(max_length=50, verbose_name='points')),
                ('click_nums', models.IntegerField(default=0, verbose_name='click_nums')),
                ('fav_nums', models.IntegerField(default=0, verbose_name='fav_nums')),
                ('add_time', models.DateTimeField(default=datetime.datetime.now)),
                ('age', models.IntegerField(default=18, verbose_name='age')),
                ('image', models.ImageField(default='user/teacher/default.jpg', upload_to='user/teacher', verbose_name='image_teacher')),
            ],
            options={
                'verbose_name': 'teacher',
                'verbose_name_plural': 'teacher',
            },
        ),
    ]
