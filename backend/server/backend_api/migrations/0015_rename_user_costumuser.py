# Generated by Django 5.0.2 on 2024-03-17 10:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('authtoken', '0003_tokenproxy'),
        ('backend_api', '0014_user'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='CostumUser',
        ),
    ]
