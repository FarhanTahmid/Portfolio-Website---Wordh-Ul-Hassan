from django.urls import path
from . import views

app_name='main_site'
urlpatterns = [
    path('',view=views.homepage,name='homepage'),
    
]