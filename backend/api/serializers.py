from rest_framework import serializers
from auth_.serializers import ProfileSerializer
from api.models import Post, Category, Comment, Like

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

class CommentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(required=False)
    owner = ProfileSerializer(required=False)
    post = PostSerializer(required=False)

    class Meta:
        model = Comment
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance


class LikeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    post = PostSerializer(required=False)
    # comment = CommentSerializer(required=False)
    owner = ProfileSerializer(required=False)

    class Meta:
        model = Like
        fields = '__all__'