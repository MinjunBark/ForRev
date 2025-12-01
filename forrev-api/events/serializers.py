from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Event

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]
        
class EventSerializer(serializers.HyperlinkedModelSerializer):
    #ensures only authenticated users can create & shows user who created event 
    created_by = serializers.CharField(source='created_by.username', read_only=True) 
    class Meta:
        model = Event
        fields = [
            'event_id',
            'created_by',
            'title',
            'description',
            'location',
            'start_time',
            'end_time',
            'created_at',
            'updated_at',
            'url',
        ]
        read_only_fields = [
            'created_by',
            'created_at',
            'updated_at',
        ]
        