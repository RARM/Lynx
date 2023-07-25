from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    """Serializer for the Lynx Game class. 
    
    This object faciliates the conversion of data between the API and JSON representation.
    """
    class Meta:
        model = Game
        fields = '__all__'