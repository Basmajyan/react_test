from django.shortcuts import render


from django.shortcuts import render

def index(request,arg=''):
    return render(request, 'index.html')