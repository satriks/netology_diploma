from rest_framework import serializers

from backend_api.models import Files


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id','name', 'description','file', 'size', 'created_at', 'user']
        read_only_fields = ['created_at', 'size']