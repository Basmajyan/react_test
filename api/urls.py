from django import views
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Index.as_view()),
    # path('<str:arg>', views.index),
    # path('<str:arg>/<str:arg2>', views.index),
    # path('<str:arg>/<str:arg2>/<str:arg3>', views.index),
]
