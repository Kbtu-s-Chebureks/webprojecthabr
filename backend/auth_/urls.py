from django.urls import path
from auth_.views import UserCreateView, login, ProfilesAPIView


urlpatterns = [

    path('login/', login),
    path('register/', UserCreateView.as_view()),
    path('create/', ProfilesAPIView.as_view()),
]