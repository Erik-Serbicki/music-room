from django.shortcuts import render
from rest_framework import generics
from . import serializers, models

# Create your views here.
class RoomView(generics.CreateAPIView):
    queryset = models.Room.object.all
    serializer_class = serializers.RoomSerializer