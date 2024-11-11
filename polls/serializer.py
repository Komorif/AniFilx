from rest_framework import serializers
from .models import ModelVideo
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class AnimeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelVideo
        fields = '__all__'


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'password_confirmation', 'first_name', 'last_name')
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError("Пароли не совпадают.")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirmation')
        user = User.objects.create_user(validated_data['username'], 
                                        password = validated_data['password'],
                                        first_name = validated_data['first_name'],
                                        email = validated_data['email'],
                                        last_name = validated_data['last_name'])
        user.set_password(validated_data['password'])
        user.save()
        return user
    
# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'