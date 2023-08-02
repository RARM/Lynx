from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .serializers import UserSerializer

@csrf_exempt
def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = make_password(salt='Lynx', password=request.POST['password'])

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({
                "message": "You have successfully logged in.",
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email
            }, status=201)
        else:
            return JsonResponse({"error": "Login not found"}, status=400)

@csrf_exempt
def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        password = make_password(salt='Lynx', password=request.POST['password'])
        passwordConfirm = make_password(salt='Lynx', password=request.POST['passwordConfirm'])


        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "That username already exists. Please try another one."}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "That email is already in use. Please try another one."}, status=400)

        if len(username) > 15:
            return JsonResponse({"error": "Username is too long."}, status=400)

        if password != passwordConfirm:
            return JsonResponse({"error": "Passwords don't match."}, status=400)

        if not username.isalnum():
            return JsonResponse({"error": "Username must be alpha-numeric."}, status=400)

        myuser = User.objects.create_user(username, email, password)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.save()

        return JsonResponse({"message": "Your account has been created."}, status=201)
    
@csrf_exempt   
def signout(request):
    logout(request)
    return JsonResponse({"message": "You have logged out successfully."}, status=201)

@csrf_exempt
def get_username(request):
    username = 'Nobody.'
    if request.user.is_authenticated:
        username = request.user.first_name
    return JsonResponse({"name": username}, status=201)