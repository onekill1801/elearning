# Generated by Django 3.0.6 on 2020-06-21 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courser', '0002_auto_20200620_2249'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='type_module',
            field=models.IntegerField(default=0),
        ),
    ]
