from django.contrib.auth.models import Group, User
from django.contrib.auth.mixins import LoginRequiredMixin


from rest_framework import permissions, viewsets

from .serializers import GroupSerializer, UserSerializer, EventSerializer
from .models import Event
from .permissions import IsOwnerOrReadOnly


# ----- CRUD ----- 
class EventViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Event.objects.all().order_by("-created_at")
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
 
class UserEventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Event.objects.filter(created_by=self.request.user).order_by("-created_at")
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
                 

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    