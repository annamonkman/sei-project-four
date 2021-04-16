# Generated by Django 3.2 on 2021-04-16 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_auto_20210416_0954'),
        ('jwt_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='wishlist',
            field=models.ManyToManyField(blank=True, related_name='items', to='items.Item'),
        ),
    ]
