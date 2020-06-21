# Generated by Django 3.0.6 on 2020-06-20 22:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
        ('courser', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='title',
            field=models.CharField(max_length=200),
        ),
        migrations.CreateModel(
            name='Quests',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('detail', models.CharField(max_length=500)),
                ('levelOfDifficult', models.IntegerField(default=0)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quest', to='courser.Course')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quest', to='user.Teacher')),
            ],
        ),
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(max_length=200)),
                ('type_answer', models.IntegerField(default=0)),
                ('quest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answer', to='courser.Quests')),
            ],
        ),
    ]
