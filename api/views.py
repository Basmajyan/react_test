from email import message
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer, CreateTodoSerializer, UserLogin
from django.contrib.auth.models import User
from django.contrib.auth import login, logout 
from django.contrib.auth.hashers import make_password, check_password


class TodoCreateView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    
class GetTodo(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # serializer_class = TodoSerializer
    # def get(self,request):
    #     queryset = Todo.objects.all()
    #     return Response({'todos':queryset})


class LogoutUser(APIView):
    def get(self, request):
        if request.user.is_authenticated:             
            logout(request)
            return Response({'logout'})
        return Response({''})


class IsAuthenticated(APIView):
    def get(self, request):
        if request.user.is_authenticated:             
            return Response({request.user.username})
        return Response({''})


class RegisterUser(APIView):
    serializer_class = UserLogin

    def post(self, request):
        username = request.data['username']
        password = make_password(request.data['password'])
        if request.user.is_authenticated: 
            return Response({'error':"User is authenticated"})
        if User.objects.filter(username=username).count() == 0:
            newUser = User.objects.create(username=username,password=password)
            newUser.save()
            login(request, newUser)
            return Response({'success':"Welcome {}!".format(username),
                             'message':"Authorization was successful."})
        return Response({'error':"A user with this username exists"})


class LoginUser(APIView):
    serializer_class = UserLogin
    
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        if request.user.is_authenticated: 
            return Response({'error':"User is authenticated"})
        if User.objects.filter(username=username).count() !=0:
            user = User.objects.get(username=username)
            if check_password(password, user.password):
                login(request, user)   
                return Response({'success':"Welcome {}!".format(user.username)})
            return Response({'error':"Password is not true!"})
        return Response({'error':"User with this name don't exists!"})

        # return Response({'request':request.data})
        # return Response(TodoSerializer(todo).data,status=status.HTTP_200_OK)
        

class CreateTodo(APIView):
    serializer_class = TodoSerializer

    def post(self, request, pk):
        print(request.data)
        if Todo.objects.filter(id=pk).count() >= 1:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                todo = Todo.objects.get(id=pk)
                if 'title' in request.data:
                    user=request.data['user']
                    title=request.data['title']
                    description=request.data['description']
                    category=request.data['category']
                    Todo.objects.filter(id=pk).update(
                        user=user,
                        title=title,
                        description=description,
                        category=category,
                    )
                    print('200')
                return Response(TodoSerializer(todo).data,status=status.HTTP_200_OK)
            else:
                todo = Todo.objects.get(id=pk)                
            return Response(TodoSerializer(todo).data,status=status.HTTP_200_OK)


        else:
            return Response({'todo not a found'})


        # serializer = self.serializer_class(data=request.data)
        # if serializer.is_valid():
        #     print(1)
        #     print('serializer.data["user""]',serializer.data['user'])
        #     print(request.data['user'])
        #     user = serializer.data['user']
        #     todoList = Todo.objects.filter(user=user)
        #     if todoList.exists():
        #         print(2)
        #         todo = todoList[0]
        #         todo.user = user    
        #         todo.save(update_fields=['user'])
        #         print(todo)
        #     else:
        #         print(3)
        #         todo = Todos(user=request.data['user'])
        #         todo.save()
        #         print(todo)
        #     return Response(TodoSerializer(todo).data,status=status.HTTP_200_OK)
        # else:
        #     print(4)
        #     return Response({'serializer is not valid'})
        