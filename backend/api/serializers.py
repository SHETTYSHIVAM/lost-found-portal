from rest_framework import serializers
from .models import Token, LostItem, FoundItem
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user



class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['token', 'created_at', 'expires_at', 'user_id', 'is_used']

   
class LostItem_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LostItem
        fields = ["id", "name", "image", "description", "place", "keywords", "date_lost", "is_found", "owner"]
        #extra_kwargs = {'owner' : {'read_only' : " True"}} # now no one can manually set who the owner is
    
    
class FoundItem_Serializer(serializers.ModelSerializer):

    class Meta:
        model = FoundItem
        fields = ["id", "name", "image", "description", "place", "keywords", "date_found", "is_returned", "finder"]
        # extra_kwargs = {'finder' : {'read_only' : " True"}} # now no one can manually set who the finder is


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'email']


