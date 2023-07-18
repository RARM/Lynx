from django.shortcuts import render
from django.contrib.auth.model import User

# Create your views here.
def signin(request):

    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']


def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        password = request.POST['password']
        passwordConfirm = request.POST['passwordConfirm']

        myuser = User.objects.create(username, email, password)
