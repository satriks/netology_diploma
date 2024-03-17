from django.http import FileResponse
from django.shortcuts import render
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth import logout
from django.shortcuts import redirect

from django.contrib.auth.models import User
from backend_api.models import Files
from backend_api.serializers import FilesSerializer, UserSerializer
from datetime import datetime
# from django.contrib.auth import get_user_model
# User = get_user_model()

# Create your views here.
class BackendAPIView(ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Files.objects.filter(user=user)
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

class DownloadFileAPIView(APIView):
    permission_classes = (AllowAny,)
    def get(self,request, id, format=None):
        queryset = Files.objects.get(linkUiid=id)
        queryset.download_counter += 1
        queryset.download_at = datetime.now()
        queryset.save()
        name = queryset.name + '.' + queryset.file.name.split('.')[-1]
        response = FileResponse(open(queryset.file.path, 'rb'), as_attachment=True, filename=name)
        # response['Content-Disposition'] = f'attachment; filename="{queryset.name}"'
        return response


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ('list', 'update', 'destroy'):
            self.permission_classes = (IsAdminUser,)
        if self.action == 'create':
            self.permission_classes = (AllowAny, )
        return super(UserViewSet, self).get_permissions()



class UserDetailView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset


class LogoutView(APIView):
    """
    Djano 5 does not have GET logout route anymore, so Django Rest Framework UI can't log out.
    This is a workaround until Django Rest Framework implements POST logout.
    Details: https://github.com/encode/django-rest-framework/issues/9206
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return redirect('/api/users')