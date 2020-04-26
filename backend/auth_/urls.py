from django.urls import path
from auth_.views import login, ProfilesAPIView, ProfileFollowingAPIView, ProfileFollowOperation, \
    ProfileFollowersAPIView, ProfileAPIView, MyUserAPIView, MyProfileAPIView


urlpatterns = [

    path('login/', login),
# path('register/', UserCreateView.as_view()),
    path('me/', MyUserAPIView.as_view()),
    path('my-profile/', MyProfileAPIView.as_view()),
    path('profile/', ProfilesAPIView.as_view()),
    path('profile/<int:pk>/', ProfileAPIView.as_view()),
    path('profile/<int:pk>/following/', ProfileFollowingAPIView.as_view()),
    path('profile/<int:pk>/followers/', ProfileFollowersAPIView.as_view()),
    path('profile/<int:pk1>/follow/<int:pk2>/', ProfileFollowOperation.as_view()),
]