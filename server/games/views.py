from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer
from django.contrib.auth.models import User

# Create your views here.
@csrf_exempt
@api_view(['POST'])
def upload(request):
    serializer = GameSerializer(data=request.data)
    user = User.objects.filter(id=request.userId)
    if serializer.is_valid():
        if user.is_authenticated:
            serializer.save()
            return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
    
@csrf_exempt
@api_view(['GET'])
def list(request):
    gameList = Game.objects.all()
    serializer = GameSerializer(gameList, many=True)
    return Response(serializer.data)

@csrf_exempt 
@api_view(['POST'])  
def download(request):
    game = request.id
    download = Game.objects.filter(id=game)
    return Response(download)

@csrf_exempt 
@api_view(['POST'])  
def purchase(request):
    user = User.objects.filter(id=request.userId)
    game = Game.objects.filter(id=request.gameId)
    if user.is_authenticated:
        user.permissions.add(game)
    return Response()