from django.contrib import admin
from . models import Ciudad, Pais

# Register your models here.
admin.site.register(Pais)
admin.site.register(Ciudad)