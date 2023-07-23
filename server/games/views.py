from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

# Create your views here.
@csrf_exempt
def upload(request):

        if request.method == "POST":
            gameId = request.POST['gid']
            gameName = request.POST['gname']

        return JsonResponse({"message": "Your account has been created."}, status=201)
    

@csrf_exempt
def list(request):
    pass

@csrf_exempt   
def download(request):
    pass