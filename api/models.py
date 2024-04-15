from django.db import models
import random 
import string

# Generate a code, check if it exists already, reapeat
def generate_unique_code():
    # Define the length of the code
    length = 4
    
    # Until we find a unique code, keep generating new ones
    while True:
        # Generate a string of all uppercase letter, choose 4 random ones, and join them into a single string
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        
        # Get a list of all rooms with a code equal to the generated code. If there are none, BOOM unique code
        if Room.objects.filter(code=code).count() == 0:
            return code
    

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=4, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)