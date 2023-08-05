from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer
from django.http import FileResponse
from django.contrib.auth.models import Permission


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return

def ignore_csrf(view_func):
    return authentication_classes([CsrfExemptSessionAuthentication])(view_func)

@api_view(['POST'])
@ignore_csrf
def upload(request):
    """Function handling the games/upload API.

    It receives a game creation request, verifies a user is authenticated, and
    upload the game if so.
    """
    request.data.update({'userId': request.user.id})
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
@api_view(['GET'])
def download(request):
    """Handler for the games/download endpoint."""
    game = request.query_params.get('id')
    download = Game.objects.get(id=game)
    file_handle = download.gbin.open()
    response = FileResponse(file_handle, content_type='File')
    response['Content-Length'] = download.gbin.size
    response['Content-Disposition'] = 'attachment; filename="%s"' % download.gbin.name
    return response

@api_view(['POST'])
@ignore_csrf
def purchase(request):
    """Handling the games/purchase endpoint.

    It add a game to the user's library given the gameId.
    """
    game = Game.objects.filter(id=request.gameId)
    if request.user.is_authenticated:
        request.user.permissions.add(game)
    return Response(game.data, status=201)

@csrf_exempt
@api_view(['GET'])
def user_games(request):
    user = request.user
    permissions = Permission.objects.filter(user=user)
    #if permissions:
    serializer = GameSerializer(permissions, many=True)
    return Response(serializer.data, status=201)

@csrf_exempt
@api_view(['GET'])
def info(request):
    """Handler for the games."""
    game = request.query_params.get('id')
    gameInfo = Game.objects.get(id=game)
    serializer = GameSerializer(gameInfo)
    return Response(serializer.data, status=201)