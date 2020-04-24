from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from auth_.serializers import UserSerializer, ProfileSerializer
from auth_.models import Profile


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})

class UserCreateView(generics.CreateAPIView):

    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        return UserSerializer

    def perform_create(self, serializer):
        username = self.request.data.pop('username')
        password = self.request.data.pop('password')
        # email = self.request.data.pop('email')
        user, created = User.objects.get_or_create(username=username)
        # user.set_email(email)
        user.set_password(password)
        user.save()

class ProfilesAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.all()

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)