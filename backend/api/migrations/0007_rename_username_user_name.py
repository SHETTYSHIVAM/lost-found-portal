# Generated by Django 5.0.4 on 2024-06-04 12:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_founditem_id_alter_lostitem_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='username',
            new_name='name',
        ),
    ]
