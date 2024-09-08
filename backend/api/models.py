from django.db import models
from django.contrib.postgres.fields import ArrayField # for storing array of keywords
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# Create your models here.


class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)



# Create your models here.
class LostItem(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True, null=True, upload_to="images/lost-items")
    description = models.TextField(blank=True, null=True)
    place = models.CharField(max_length=100, null=True)
    keywords = ArrayField(models.CharField(max_length=200), blank=True, null=True)
    date_lost = models.DateTimeField()
    is_found = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="lost_items")
    '''ON DELETE CASCADE is used to specify that when a row is deleted from the parent table, all rows in the child table that reference the deleted row should also be deleted.
    '''
    class Meta:
        verbose_name_plural = 'Lost Items'

    def __str__(self):
        return self.name


class FoundItem(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images/found-items", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    place = models.CharField(max_length=100, null=True)
    keywords = ArrayField(models.CharField(max_length=200), blank=True, null=True)
    date_found = models.DateTimeField()
    is_returned = models.BooleanField(default=False)
    finder = models.ForeignKey(User, on_delete=models.CASCADE, related_name="found_items")

    class Meta:
        verbose_name_plural = 'Found Items'

    def __str__(self):
        return self.name
