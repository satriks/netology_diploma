# Generated by Django 5.0.2 on 2024-03-04 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0002_alter_files_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='size',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
