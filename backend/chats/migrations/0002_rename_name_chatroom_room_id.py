# Generated by Django 5.0.4 on 2024-08-17 13:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatroom',
            old_name='name',
            new_name='room_id',
        ),
    ]
