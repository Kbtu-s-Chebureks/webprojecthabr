from django.contrib.auth.models import User
from rest_framework import generics
from auth_.serializers import UserSerializer

from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from auth_.models import Profile
from auth_.serializers import ProfileSerializer



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

@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


# @api_view(['POST'])
# def logout(request):
#     request.auth.delete()
#     return Response({}, status.HTTP_200_OK)


@api_view(['GET'])
def me(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        exception = {"detail": "Authentication credentials were not provided."}
        return Response(exception, status=status.HTTP_401_UNAUTHORIZED)




class ProfilesAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.all()

    def perform_create(self, serializer):
        # username = self.request.data.pop('username')
        # password = self.request.data.pop('password')
        # # email = self.request.data.pop('email')
        # user, created = User.objects.get_or_create(username=username)
        # # user.set_email(email)
        # user.set_password(password)
        # user.save()
        return serializer.save(user=self.request.user)

class ProfileAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def perform_update(self, serializer):
        return serializer.save()

    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()
        user.delete()
        return Response({})

