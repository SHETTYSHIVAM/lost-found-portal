from django.db import models
from django.contrib.auth.models import User
import hashlib

# Create your models here.

class ChatRoom(models.Model):
    room_id = models.CharField(max_length=200)
    users = models.ManyToManyField(User)

    def create_id(user1, user2):
        return hashlib.sha256(f"{user1.id}{user2.id}".encode('utf-8')).hexdigest()


    def get_or_create_chatroom(user1, user2):

        room_id = ChatRoom.create_id(user1, user2)
        
        chatroom, created = ChatRoom.objects.get_or_create(room_id=room_id)
        print('created', created)
        
        if created:
            chatroom.users.add(user1, user2)

        users = list(chatroom.users.values('id', 'username'))
        
        return chatroom, users,  created
    
    def __str__(self):
        return self.room_id
    


class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, related_name='messages', on_delete=models.CASCADE)
    sender = models.CharField(max_length=100)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read_by = models.ManyToManyField(User, related_name='read_messages', blank=True)

    def mark_as_read(self, user):
        self.read_by.add(user)
        self.save()
