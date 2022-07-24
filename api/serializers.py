from attr import fields
from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User

class UserLogin(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'password'
        )

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            'user',
            'title',
            'description',
            'category',
            'date',
        )

class CreateTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            'user',
        )