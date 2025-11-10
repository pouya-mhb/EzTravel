from .models import Flight, FlightBooking
from .serializers import FlightBookingSerializer, FlightSerializer
from core.amadeus_client import search_flights
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from rest_framework.views import APIView

@api_view(['GET'])
def flight_search(request):
    origin = request.query_params.get('origin')
    destination = request.query_params.get('destination')
    departure_date = request.query_params.get('departure_date')
    return_date = request.query_params.get('return_date')
    adults = int(request.query_params.get('adults', 1))

    if not all([origin, destination, departure_date]):
        return Response({"error": "Missing required parameters"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        data = search_flights(origin, destination, departure_date, return_date, adults)
        offers = []

        for offer in data.get('data', []):
            offer_id = offer['id']
            price = offer['price']['total']
            currency = offer['price']['currency']
            itinerary = offer['itineraries'][0]
            segment = itinerary['segments'][0]

            flight = Flight.objects.update_or_create(
                offer_id=offer_id,
                defaults={
                    'airline': segment['carrierCode'],
                    'flight_number': segment['number'],
                    'origin': segment['departure']['iataCode'],
                    'destination': segment['arrival']['iataCode'],
                    'departure_time': segment['departure']['at'],
                    'arrival_time': segment['arrival']['at'],
                    'duration': itinerary.get('duration'),
                    'price': price,
                    'currency': currency,
                    'adults': adults,
                }
            )[0]
            offers.append(flight)

        serializer = FlightSerializer(offers, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FlightBookingAPIView(APIView):
    def post(self, request):
        flight_id = request.data.get("flight_id")
        full_name = request.data.get("full_name")
        email = request.data.get("email")
        phone = request.data.get("phone")

        if not flight_id or not all([full_name, email, phone]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            flight = Flight.objects.get(id=flight_id)
        except Flight.DoesNotExist:
            return Response({"error": "Flight not found"}, status=status.HTTP_404_NOT_FOUND)

        booking = FlightBooking.objects.create(
            flight=flight,
            full_name=full_name,
            email=email,
            phone=phone
        )

        serializer = FlightBookingSerializer(booking)
        return Response(
            {
                "message": "Booking successful (test mode)",
                "reference_code": booking.reference_code,
                "booking": serializer.data
            },
            status=status.HTTP_201_CREATED
        )
