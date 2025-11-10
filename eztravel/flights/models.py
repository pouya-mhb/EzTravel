from django.db import models
import uuid
from django.utils import timezone

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

class FlightBooking(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name="bookings")
    full_name = models.CharField(max_length=100)
    email = models.EmailField(default='')
    phone = models.CharField(max_length=30, default='')
    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="pending")
    reference_code = models.CharField(max_length=12, unique=True, editable=False, blank=True)

    def save(self, *args, **kwargs):
        if not self.reference_code:
            self.reference_code = str(uuid.uuid4().hex[:12]).upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} - {self.flight}"
