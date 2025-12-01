from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    # Event fields
    title = models.CharField(max_length=20)
    description = models.TextField(max_length=100, default="")
    location = models.CharField(max_length=30, default="") #w/o default causes errors CANNOT BE NULL value
    start_time = models.DateTimeField(null=True, blank=True, default=None)
    end_time = models.DateTimeField(null=True, blank=True, default=None)
    # Meta data fields
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    event_id = models.AutoField(primary_key=True)
    
    
    
    
    def __str__(self):
        return f"{self.title} by {self.created_by.username}" 
    
    
    # consistent sorting 
    class Meta:
        ordering = ['-created_at'] 