from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(DefaultUserInformation)
class DefaultUserInformationAdmin(admin.ModelAdmin):
    list_display=[
        'pk','full_name','current_position','email'
    ]