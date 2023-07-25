from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer

@csrf_exempt
@api_view(['POST'])
def upload(request):
    """Function handling the games/upload API.

    It receives a game creation request, verifies a user is authenticated, and
    upload the game if so.
    """
    serializer = GameSerializer(data=request.data)
    if serializer.is_valid():
        if request.user.is_authenticated: # Checking if the user is authenticated.
            serializer.save()
            return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
    
@csrf_exempt
@api_view(['GET'])
def list(request):
    """Function handling the games/list API.

    It returns all the games in the savers as a list. This allows the client's
    featured games list.
    """
    gameList = Game.objects.all()
    serializer = GameSerializer(gameList, many=True)
    return Response(serializer.data, status=201)

@csrf_exempt 
@api_view(['POST'])  
def download(request):
    """Handler for the games/download endpoint."""
    game = request.id
    download = Game.objects.filter(id=game)
    return Response(download.data, status=201)

@csrf_exempt 
@api_view(['POST'])  
def purchase(request):
    """Handling the games/purchase endpoint.

    It add a game to the user's library given the gameId.
    """
    game = Game.objects.filter(id=request.gameId)
    if request.user.is_authenticated:
        request.user.permissions.add(game)
    return Response(game.data, status=201)