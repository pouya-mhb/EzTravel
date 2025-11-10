from django.urls import path
from .views import FlightBookingAPIView, flight_search

urlpatterns = [
    path('search/', flight_search, name='flight-search'),
    path("book/", FlightBookingAPIView.as_view(), name="flight-book"),
]
