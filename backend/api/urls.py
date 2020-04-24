from django.urls import path
from api.views import PostListAPIView, PostDetailAPIView, CategoryPostsAPIView, CategoryListAPIView


urlpatterns = [

    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:id>/posts/', CategoryPostsAPIView.as_view()),
    path('posts/', PostListAPIView.as_view()),
    path('posts/<int:pk>', PostDetailAPIView.as_view()),
]
