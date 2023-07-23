from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from models import Game

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
                                "gname": newGame.gname}, status=201)
    

@csrf_exempt
def list(request):
    if request.method == "GET":
        games = Game.objects.all()
        gameList = []
        for game in games:
               gameList.append(game)
        return JsonResponse({"message": "Here is the list.",
                            "gameList": gameList}, status=201)

@csrf_exempt   
def download(request):
    pass