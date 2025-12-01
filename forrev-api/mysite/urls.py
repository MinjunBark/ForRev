from django.urls import include, path
from rest_framework import routers 
from events import views
from events.auth_views import (register_view, login_view, logout_view, current_user_view, get_csrf_token)

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)
router.register(r"events", views.EventViewSet)
router.register(r"user-events", views.UserEventViewSet, basename='user-event')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    
    # authenticated endpoints
    path("auth/register/", register_view, name='register'),
    path("auth/login/", login_view, name='login'),
    path("auth/logout/", logout_view, name='logout'),
    path("auth/user/", current_user_view, name='current-user'),
    
    path("auth/csrf/", get_csrf_token, name='csrf-token'),
    
    
]