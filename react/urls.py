from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path(('api/'),include('api.urls')),
    path((''),include('main.urls')),
    re_path(r'^.*$', views.index, name="home")
    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
