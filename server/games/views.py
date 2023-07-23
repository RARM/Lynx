from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

class Game:
    def __init__(self, gid, gname, gbin):
        self.gameId = gid
        self.gameName = gname
        self.gameBin = gbin

class GameSerializer(serializers.Serializer):
                gameId = serializers.CharField(max_length=200)
                gameName = serializers.CharField(max_length=200)
                gameBin = serializers.FileField()

# Create your views here.
@csrf_exempt
def upload(request):

        if request.method == "POST":
            upload = Game(request.POST['gid'], request.POST['gname'], request.POST['gbin'])
            json = JSONRenderer().render(upload.data)
            #gameId = request.POST['gid']
            #gameName = request.POST['gname']
            #gameBin = request.POST['gbin']
            

        return JsonResponse({"message": "Your game has been uploaded.",
                             "gname": upload.gname}, status=201)
    

@csrf_exempt
def list(request):
    pass

@csrf_exempt   
def download(request):
    pass