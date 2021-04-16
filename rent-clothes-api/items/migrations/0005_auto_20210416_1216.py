# Generated by Django 3.2 on 2021-04-16 12:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('items', '0004_auto_20210416_1132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='colour',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='current_renter',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='current_renter', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='item',
            name='image_03',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]