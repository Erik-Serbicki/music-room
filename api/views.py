from django.shortcuts import render
from rest_framework import generics
from . import serializers, models

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer