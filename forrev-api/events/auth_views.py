from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import ensure_csrf_cookie


@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'detail': 'CSRF cookie set'})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not password: 
        return Response(
            {'error': 'Username and Password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username = username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
        
    user = User.objects.create_user(
        username = username,
        email = email,
        password = password,
    )
    
    login(request, user)
    
    return Response({
        'message': 'Registration Successful',
        'user': {
            'username': user.username,
            'email': user.email,
        }
    }, status=status.HTTP_201_CREATED)
    
    
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Username and Password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return Response ({
            'message': 'Login Successful',
            'user': {
                'username': user.username,
                'email': user.email,
            }
        })
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
  
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout Successful'})
  
  
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    if request.user.is_authenticated:
        return Response({
            'isAuthenticated' : True,
            'user' : {
                'username' : request.user.username,
                'email' : request.user.email,
            }
        })
    else:
        return Response({
            'isAuthenticated' : False,
            'user' : None,
        })
        