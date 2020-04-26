from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from auth_.models import Profile, Follow
from auth_.serializers import UserSerializer, ProfileSerializer


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


class ProfilesAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.all()

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class ProfileAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.all()


class ProfileFollowingAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile1 = Profile.objects.get(id=self.kwargs['pk'])
        follows = Follow.objects.filter(profile1=profile1)
        followings = []
        for follow in follows:
            followings.append(follow.profile2)
        return followings


class ProfileFollowersAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile2 = Profile.objects.get(id=self.kwargs['pk'])
        follows = Follow.objects.filter(profile2=profile2)
        followers = []
        for follow in follows:
            followers.append(follow.profile1)
        return followers


class ProfileFollowOperation(APIView):
    permission_classes = (IsAuthenticated,)

    def get_profile(self, pk):
        try:
            profile = Profile.objects.get(id=pk)
        except Profile.DoesNotExist:
            raise Http404
        return profile

    def post(self, request, pk1, pk2):
        profile1 = self.get_profile(pk=pk1)
        profile2 = self.get_profile(pk=pk2)
        try:
            Follow.objects.get(profile1=profile1, profile2=profile2)
            return Response({'status': 'already exist'}, status=status.HTTP_200_OK)
        except Follow.DoesNotExist:
            follow = Follow(profile1=profile1, profile2=profile2)
            follow.save()
            return Response({}, status=status.HTTP_201_CREATED)

    def delete(self, request, pk1, pk2):
        profile1 = self.get_profile(pk=pk1)
        profile2 = self.get_profile(pk=pk2)
        follow = Follow.objects.get(profile1=profile1, profile2=profile2)
        follow.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class MyUserAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class MyProfileAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)
