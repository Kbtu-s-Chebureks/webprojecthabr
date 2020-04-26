from django.urls import path
from api.views import PostListAPIView, PostDetailAPIView, CategoryPostsAPIView,\
                    CategoryListAPIView, ProfilePostAPIView, PostLikesAPIView, \
                    PostCommentsAPIView, PostLikeAPIView


urlpatterns = [
    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:id>/posts/', CategoryPostsAPIView.as_view()),
    path('posts/', PostListAPIView.as_view()),
    path('posts/<int:id>/', PostDetailAPIView.as_view()),
    path('profile/<int:id>/posts/', ProfilePostAPIView.as_view()),
    path('posts/<int:pk>/like/', PostLikesAPIView.as_view()),
    path('posts/<int:pk1>/like/<int:pk2>', PostLikeAPIView.as_view()),
    path('posts/<int:pk>/comment/', PostCommentsAPIView.as_view()),
]
