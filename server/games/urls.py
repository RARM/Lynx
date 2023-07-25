from django.urls import path

from . import views

urlpatterns = [
    path("upload", views.upload, name="upload"),
    path("list", views.list, name="list"),
    path("download", views.download, name="download"),
    path("purchase", views.purchase, name="purchase"),


    # https://api.lynxgamestore.com/hello/world
    # https://api.lynxgamestore.com/hello/person
]