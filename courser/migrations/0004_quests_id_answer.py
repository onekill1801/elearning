# Generated by Django 3.0.6 on 2020-06-21 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courser', '0003_module_type_module'),
    ]

    operations = [
        migrations.AddField(
            model_name='quests',
            name='id_answer',
            field=models.IntegerField(default=0),
        ),
    ]
