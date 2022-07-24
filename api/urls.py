from django import views
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.TodoCreateView.as_view()),
    path('login', views.LoginUser.as_view()),
    path('registration', views.RegisterUser.as_view()),
    path('is_authenticated', views.IsAuthenticated.as_view()),
    path('logout', views.LogoutUser.as_view()),
    path('create_todo/<str:pk>', views.CreateTodo.as_view()),
    path('todo_list', views.GetTodo.as_view()),
        
]
