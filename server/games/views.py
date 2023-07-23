from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from .models import Game, GameSerializer

# Create your views here.
@csrf_exempt
def upload(request):

        if request.method == "POST":
            newGame = Game(gameName = request.POST['gname'], gameBin = request.POST['gbin'], gameDescription=request.POST['gdescr'])
            newGame.save()
            #gameId = request.POST['gid']
            #gameName = request.POST['gname']
            #gameBin = request.POST['gbin']
            

            return JsonResponse({"message": "Your game has been uploaded.",
                                "gameName": newGame.gameName}, status=201)
    

@csrf_exempt
def list(request):
    if request.method == "GET":
        gameList = GameSerializer(Game.objects.all())
        return JsonResponse({"message": "Here is the list.",
                            "gameList": gameList.data}, status=201)

@csrf_exempt   
def download(request):
    pass