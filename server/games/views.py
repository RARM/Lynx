from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer

# Create your views here.
@csrf_exempt
@api_view(['POST'])
def upload(request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
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