from django.contrib import admin

from backend_api.models import Files

# Register your models here.
# admin.site.register(Files)
@admin.register(Files)
class FilesAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'description','file', 'size', 'created_at', 'user', 'linkUiid')
