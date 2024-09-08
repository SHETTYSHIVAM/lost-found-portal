from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class ChatRoom(models.Model):
    room_id = models.CharField(max_length=100)
    users = models.ManyToManyField(User)

    def get_or_create_chatroom(user1, user2):
        # Sort user IDs to ensure uniqueness
        room_id = f"chat_{min(user1.id, user2.id)}_{max(user1.id, user2.id)}"
        
        # Get or create the chat room with these users
        chatroom, created = ChatRoom.objects.get_or_create(room_id)
        
        # Add users to the room if it's newly created
        if created:
            chatroom.users.add(user1, user2)
        
        return chatroom, created
    


class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, related_name='messages', on_delete=models.CASCADE)
    sender = models.CharField(max_length=100)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read_by = models.ManyToManyField(User, related_name='read_messages', blank=True)

    def mark_as_read(self, user):
        self.read_by.add(user)
        self.save()
