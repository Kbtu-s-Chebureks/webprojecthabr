from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Category, Post
from api.serializers import CategorySerializer, PostSerializer
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