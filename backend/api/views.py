from django.http import Http404
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Category, Post, Like, Comment
from api.serializers import CategorySerializer, PostSerializer, LikeSerializer, CommentSerializer
from auth_.models import Profile


class CategoryListAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)



class CategoryPostsAPIView(APIView):
    def get_category(self, id):
        try:
            return Category.objects.get(id=id)
        except Category.DoesNotExist as e:
            return Response({'error': str(e)})

    def get(self, request, id):
        category = self.get_category(id)
        posts = category.post_set.all()
        
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, id):
        category = self.get_category(id)
        profile = Profile.objects.get(user=self.request.user)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(category=category, author_id=profile.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # def put(self, request, id):
    #     company = self.get_company(id)
    #     serializer = CompanySerializer(instance=company, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response({'error': serializer.errors})

    # def delete(self, request, id):
    #     company = self.get_company(id)
    #     company.delete()
    #     return Response({'deleted': True})

class ProfilePostAPIView(APIView):
    def get_profile(self, id):
        try:
            return Profile.objects.get(id=id)
        except Profile.DoesNotExist as e:
            return Response({'error': str(e)})

    def get(self, request, id):
        profile = self.get_profile(id)
        posts = profile.posts.all()

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    # def post(self, request, id):
    #     category = self.get_category(id)
    #     profile = Profile.objects.get(user=self.request.user)
    #     serializer = PostSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(category=category, author_id=profile.id)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response({'error': serializer.errors},
    #                     status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PostListAPIView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class PostDetailAPIView(APIView):
    def get_post(self, id):
        try:
            return Post.objects.get(id=id)
        except Post.DoesNotExist as e:
            return Response({'error': str(e)})

    def get(self, request, id):
        post = self.get_post(id)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, id):
        post = self.get_post(id)
        serializer = PostSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors})

    def delete(self, request, id):
        post = self.get_post(id)
        post.delete()
        return Response({'deleted': True})



class PostLikesAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LikeSerializer

    def get_post(self):
        try:
            post = Post.objects.get(id=self.kwargs['pk'])
        except Post.DoesNotExist:
            raise Http404
        return post

    def get_queryset(self):
        return self.get_post().likes.all()

    def perform_create(self, serializer):
        return serializer.save(post=self.get_post(), owner=Profile.objects.get(user=self.request.user))
    # ok

class PostLikeAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_post(self, pk1):
        try:
            post = Post.objects.get(id=pk1)
        except Post.DoesNotExist:
            raise Http404
        return post

    def get(self, request, pk1, pk2):
        try:
            like = self.get_post(pk1=pk1).likes.get(id=pk2)
        except Like.DoesNotExist:
            raise Http404
        serializer = LikeSerializer(like)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk1, pk2):
        try:
            like = self.get_post(pk1=pk1).likes.get(id=pk2)
        except Like.DoesNotExist:
            raise Http404
        like.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)



class PostCommentsAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

    def get_post(self):
        try:
            post = Post.objects.get(id=self.kwargs['pk'])
        except Post.DoesNotExist:
            raise Http404
        return post

    def get_queryset(self):
        return self.get_post().comments.all()

    def perform_create(self, serializer):
        return serializer.save(post=self.get_post(), owner=Profile.objects.get(user=self.request.user))

class PostCommentAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_post(self, pk1):
        try:
            post = Post.objects.get(id=pk1)
        except Post.DoesNotExist:
            raise Http404
        return post

    def get(self, request, pk1, pk2):
        try:
            comment = self.get_post(pk1=pk1).comments.get(id=pk2)
        except Comment.DoesNotExist:
            raise Http404
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk1, pk2):
        try:
            instance = self.get_post(pk1=pk1).comments.get(id=pk2)
        except Comment.DoesNotExist:
            raise Http404
        serializer = CommentSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk1, pk2):
        try:
            comment = self.get_post(pk1=pk1).comments.get(id=pk2)
        except Comment.DoesNotExist:
            raise Http404
        comment.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)