from rest_framework import serializers
from auth_.serializers import ProfileSerializer
from api.models import Post, Category

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model=Category
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(required=False)
    author = ProfileSerializer(required=False)
    category = CategorySerializer(required=False)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        return Post.objects.create(**validated_data)
