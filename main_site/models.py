from django.db import models

# Create your models here.

class DefaultUserInformation(models.Model):
    full_name=models.CharField(null=False,blank=False,max_length=100)
    current_position=models.CharField(null=False,blank=False,max_length=100)
    email=models.EmailField(null=False,blank=False)
    
    # overriding the save method, so that this model has only one instance of data for a particular website.
    def save(self,*args, **kwargs):
        # Delete all existing rows before saving a new one
        if DefaultUserInformation.objects.exists():
            DefaultUserInformation.objects.all().delete()
        super(DefaultUserInformation,self).save(*args, **kwargs)
    
    class Meta:
        verbose_name = "Default User Information"
        verbose_name_plural = "Default User Informations"
    def __str__(self):
        return str(self.pk)
