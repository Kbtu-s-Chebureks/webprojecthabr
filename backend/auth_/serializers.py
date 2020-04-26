from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Follow


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(required=False)
    user = UserSerializer(required=False)

    class Meta:
        model = Profile
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    profile1 = ProfileSerializer(required=False)
    profile2 = ProfileSerializer(required=False)

    class Meta:
        model = Follow
        fields = '__all__'