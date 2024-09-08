from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User, Token, LostItem, FoundItem

# Register your models here.
admin.site.register(Token)
admin.site.register(LostItem)
admin.site.register(FoundItem)
