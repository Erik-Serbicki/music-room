from django.shortcuts import render
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post

# Create your views here.
class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = ''