from rest_framework import serializers
from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token

from backend_api.models import Files


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id','name', 'description','file', 'size', 'created_at', 'user']
        read_only_fields = ['created_at', 'size']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
        )

        return user
    class Meta:
        model = User
        fields = ['id','url', 'username','password', 'is_staff','email', 'files']
        read_only_fields = ['files']


    def save(self, **kwargs):
        user = super(UserSerializer, self).save(**kwargs)
        Token.objects.create(user=user)
