from django.urls import path
from auth_.views import UserCreateView, login, me, ProfilesAPIView


urlpatterns = [

    path('login/', login),
    # path('logout/', views.logout),
    path('me/', me),
    path('register/', UserCreateView.as_view()),
    path('profilecreate/', ProfilesAPIView.as_view()),
]