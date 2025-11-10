from django.db import models

class Flight(models.Model):
    offer_id = models.CharField(max_length=255, unique=True)
    airline = models.CharField(max_length=100)
    flight_number = models.CharField(max_length=20, blank=True, null=True)

    origin = models.CharField(max_length=10)
    destination = models.CharField(max_length=10)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()

    duration = models.CharField(max_length=20, blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="USD")

    adults = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.airline} {self.flight_number or ''} {self.origin}->{self.destination}"
