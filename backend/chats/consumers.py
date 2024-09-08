import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime
from .models import ChatMessage, ChatRoom
from channels.db import database_sync_to_async

class TextRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        # Parse the JSON message
        text_data_json = json.loads(text_data)
        message = text_data_json.get('text', '')  # Use 'text' as the key for messages
        sender = text_data_json.get('sender', '')  # Include 'sender' if needed
        timestamp = datetime.now().strftime('%b %d, %Y %H:%M:%S')
        
        print('timestamp', timestamp)

        # Save the message to the database
        room = await database_sync_to_async(ChatRoom.objects.get_or_create)(room_id=self.room_name)
        await database_sync_to_async(ChatMessage.objects.create)(room=room[0], sender=sender, message=message, timestamp=timestamp)


        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender,  # Include sender in the group message
                'timestamp': timestamp,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        sender = event.get('sender', '')  # Retrieve sender if available
        timestamp = event.get('timestamp', '')  # Retrieve timestamp

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,  # Include sender in the WebSocket message
            'timestamp': timestamp,  # Send the timestamp to the frontend
        }))
