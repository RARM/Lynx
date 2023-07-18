from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def signin(request):

    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('discover')
        else:
            messages.error(request, "Login not found")
            return redirect('signin')


def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        password = request.POST['password']
        passwordConfirm = request.POST['passwordConfirm']

        if User.objects.filter(username=username):
            messages.error(request, "That username already exists. Please try another one.")
            redirect('signup')

        if User.objects.filter(email=email):
            messages.error(request, "That email already. Please try another one.")
            redirect('signup')

        myuser = User.objects.create_user(username, email, password)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.email = email

        myuser.save()

        messages.success(request, "Your account has been created.")
        return redirect('signin')
    
def signout(request):
    logout(request)
    messages.success(request, "Logged out successfully.")
    redirect('signin')
