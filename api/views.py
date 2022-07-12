from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import Todos
from .serializers import TodoSerializer

# def index(request,arg='',arg2='',arg3=''):
#     return render(request, 'index.html')
class Index(generics.ListAPIView):
    queryset = Todos.objects.all()
    serializer_class = TodoSerializer
    
    