from django.db import models
from auth_.models import Profile

class Category(models.Model):
    name = models.CharField(max_length=50)

class Post(models.Model):
    title = models.CharField(max_length=50)
    text = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=None, null=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='posts')

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'