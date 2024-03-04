from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from backend_api.models import Files
from backend_api.serializers import FilesSerializer


# Create your views here.
class BackendAPIView(ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
