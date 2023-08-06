from django.urls import path

from . import views

urlpatterns = [
    path("upload", views.upload, name="upload"),
    path("list", views.list, name="list"),
    path("download", views.download, name="download"),
    path("thumbnail", views.thumbnail, name="thumbnail"),
    path("purchase", views.purchase, name="purchase"),
    path("user_games", views.user_games, name="user_games"),
    path("info", views.info, name="info")
]