from django.db import models

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField()
    max_spots = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    

# class Attendee(models.Model):
