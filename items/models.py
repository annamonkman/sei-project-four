from django.db import models
from django.contrib.postgres.fields import ArrayField

class Item(models.Model):
    name = models.CharField(max_length=80, null=True, unique=True)
    image_01 = models.CharField(max_length=300)
    image_02 = models.CharField(max_length=300)
    image_03 = models.CharField(max_length=300, blank=True, null=True)
    garment_type = models.CharField(max_length=50)
    brand = models.CharField(max_length=100)
    size = models.IntegerField()
    price = models.FloatField()
    rrp = models.FloatField()
    # colour = ArrayField(ArrayField(models.CharField(max_length=20), blank=True))
    colour = models.CharField(max_length=100, blank=True, null=True)
    material = models.CharField(max_length=100, blank=True, null=True)
    is_available = models.BooleanField(default=True)
    description = models.TextField(max_length=800)
    current_renter = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE, related_name="items", blank=True, null=True)

    def __str__(self):
        return f"{self.name}, {self.garment_type}, {self.brand}"