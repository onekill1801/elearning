from django.db import models

# Create your models here.
class UserModel(models.Model):
    user_name = models.CharField(max_length=200)
    pass_word = models.CharField(max_length=200)
    type_user = models.IntegerField()

    class Meta:
        ordering = ['user_name']

    def __str__(self):
        return self.user_name
