from curses import flash
from turtle import title
from unicodedata import category
from django.db import models

class Todo(models.Model):
    user = models.CharField(verbose_name="Author", max_length=80)
    title = models.CharField(verbose_name="Title", max_length=50)
    description = models.TextField(verbose_name="Description")
    category = models.CharField(verbose_name="Category", max_length=50)
    date = models.DateTimeField(verbose_name="Time", auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'


    def __str__(self):
        return ('{} {}'.format(self.title, self.user))


