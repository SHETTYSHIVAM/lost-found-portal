from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.utils import timezone
# Create your views here.
from django.http import JsonResponse
from chats.models import ChatMessage, ChatRoom

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.views import View



def get_messages(request, room_name):
    try:
        room = ChatRoom.objects.get(room_id=room_name)
    except ChatRoom.DoesNotExist:
        return JsonResponse({'error': 'Room not found'}, status=404)
    
    messages = ChatMessage.objects.filter(room=room).order_by('timestamp')
    message_list = [
        {
            'id': msg.id,
            'name': msg.sender,
            'msg': msg.message,
            'timestamp': msg.timestamp#.strftime('%I:%M %p'),
        }
        for msg in messages
    ]
    return JsonResponse({'messages': message_list})

def delete_message(request, room_name, message_id):
    try:
        print('room',room_name, 'id', message_id)
        room = ChatRoom.objects.get(room_id=room_name)
        room_id = room.id
        Chat_to_delete = ChatMessage.objects.get(room = room_id, id = message_id)
        Chat_to_delete.delete()
    except ChatMessage.DoesNotExist:
        return JsonResponse({'response' : "Message does not exist"}, status= 404)
    
    return JsonResponse({ 'response' : "Message Deleted Successfully"}, status=201)
    

class CreateOrGetChatRoomView(View):
    def get(self, request, user1_id, user2_id):
        # Ensure the users exist
        user1 = get_object_or_404(User, id=user1_id)
        user2 = get_object_or_404(User, id=user2_id)
        
        # Create a unique room ID by concatenating the user IDs or usernames in a sorted order
        room_id = f"chat_{min(user1.id, user2.id)}_{max(user1.id, user2.id)}"
        
        # Get or create the chatroom with these two users
        chatroom, created = ChatRoom.get_or_create_chatroom(user1= user1, user2= user2)
        if created:
            chatroom.users.add(user1, user2)
        
        # Return the room ID in a JSON response
        return JsonResponse({
            'room_id': chatroom.room_id,
            'created': created
        })


def user_chats(request, user_id):
    user = User.objects.get(id=user_id)
    chat_rooms = ChatRoom.objects.filter(users=user)
    chats = []

    for room in chat_rooms:
        # Convert messages to a list of dictionaries
        messages = ChatMessage.objects.filter(room_id = room).order_by('timestamp').values('id', 'message', 'timestamp')
        
        # Get the other user in the chat room
        users = room.users.exclude(id=user.id)
        other_user = users.first()

        # Convert the other user to a dictionary
        other_user_data = {
            'id': other_user.id,
            'username': other_user.username,
            'email': other_user.email,
        } if other_user else None

        # Append the chat room data to the list
        chats.append({
            'room': room.room_id,
            'messages': list(messages),
            'other_user': other_user_data,
        })

    return JsonResponse({'user_chats': chats})
