from django.shortcuts import render
from .models import *
# Create your views here.

def homepage(request):
    
    # get all the user informations
    user_information_object=DefaultUserInformation.objects.all().first()
    context={
        'full_name':user_information_object.full_name
    }
    
    
    return render(request,'index.html',context=context)