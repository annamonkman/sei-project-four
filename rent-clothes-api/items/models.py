from django.db import models
from django.contrib.postgres.fields import ArrayField

class Item(models.Model):
    name = models.CharField(max_length=80, null=True, unique=True)
    image_01 = models.CharField(max_length=300)
    image_02 = models.CharField(max_length=300)
    image_03 = models.CharField(max_length=300)
    garment_type = models.CharField(max_length=50)
    brand = models.CharField(max_length=80)
    size = models.FloatField()
    price = models.FloatField()
    rrp = models.FloatField()
    colour = ArrayField(ArrayField(models.CharField(max_length=20), blank=True))
    material = ArrayField(ArrayField(models.CharField(max_length=20), blank=True))
    is_available = models.BooleanField(default=True)
    description = models.TextField(max_length=200)
    # current_rental_items = models.ForeignKey('jwt_auth.User', on_delete=models.CASCADE, related_name='current_rental_items')

    def __str__(self):
        return f"{self.name}, {self.garment_type}, {self.brand}"