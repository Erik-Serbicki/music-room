from django.shortcuts import render
from rest_framework import generics, status
from . import serializers, models
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    
class CreateRoomView(APIView):
    serializer_class = serializers.CreateRoomSerializer
    
    def post(self, request, format=None):
        pass