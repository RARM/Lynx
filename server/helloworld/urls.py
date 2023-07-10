from django.urls import path

from . import views

urlpatterns = [
    path("world", views.world, name="world"),
    path("person", views.person, name="person"),

    # https://api.lynxgamestore.com/hello/world
    # https://api.lynxgamestore.com/hello/person
]