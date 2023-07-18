from django.urls import path

from . import views

urlpatterns = [
    path("signin", views.signin, name="signin"),
    path("signup", views.signup, name="signup"),


    # https://api.lynxgamestore.com/hello/world
    # https://api.lynxgamestore.com/hello/person
]