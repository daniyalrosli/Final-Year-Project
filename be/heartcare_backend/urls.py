from django.urls import path
from .views import signup, login_view, logout_view, predict

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('predict/', predict, name='predict'),
]