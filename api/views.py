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
    # Define which serializer we want to use
    serializer_class = serializers.CreateRoomSerializer
    
    # Send a post request
    def post(self, request, format=None):
        # Does the session exist? If not, let's create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        # Send data to the serailzer to be translated into python code
        serializer = self.serializer_class(data=request.data)
        # Is the data valid?
        if serializer.is_valid():
            # Set the model values to the data from the webpage
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            host = self.request.session.session_key
            
            # If the session does already exist, we want to update the existing fields, not create new ones
            
            # Returns a list of rooms that satisfy the filter
            queryset = models.Room.objects.filter(host=host)
            if queryset.exists():
                # There will only be one item in the list, but we still need to get just that item
                room = queryset[0]
                # Set the values
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                # Save the room, tell it which fields we are updating
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                # Return the room in our HTTP response
                return Response(serializers.RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                # Create new room
                room = models.Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                # Return the room in our HTTP response
                return Response(serializers.RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            
        # This should only return if our inputs are bad    
        return Response({'Error':"Input not valid"}, status=status.HTTP_400_BAD_REQUEST)
            