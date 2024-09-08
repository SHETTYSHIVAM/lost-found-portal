from django.urls import path
from .views import get_messages, delete_message, CreateOrGetChatRoomView, user_chats

urlpatterns = [
    path('messages/<str:room_name>/', get_messages, name='get_messages'),
    path('delete/<str:room_name>/<int:message_id>', delete_message, name='delete'),
    path('create-or-get-chatroom/<int:user1_id>/<int:user2_id>/', CreateOrGetChatRoomView.as_view(), name='create_or_get_chatroom'),
    path('user-chats/<int:user_id>', user_chats, name='users_chats')
]