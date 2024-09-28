from rest_framework import viewsets
from .models import CarModel, Dealer, Appointment, UserProfile,Brand
from .serializers import CarModelSerializer, DealerSerializer, AppointmentSerializer, UserProfileSerializer,UserSerializer,BrandSerializer


from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from django.db.models import F
from rest_framework.decorators import action
from rest_framework import filters
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CarModelViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'brand']
    @action(detail=False, methods=['get'], url_path='top-reviewed')
    def top_reviewed(self, request):
        # Get the top 20 car models sorted by review in descending order
        top_cars = CarModel.objects.filter(review__isnull=False).order_by('-review')[:20]
        serializer = self.get_serializer(top_cars, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['get'], url_path='brand')
    def get_car_models_by_brand(self, request):
        brand = request.query_params.get('brand', None)  # Use request.query_params
        if brand:
            cars = CarModel.objects.filter(brand=brand)
        else:
            cars = CarModel.objects.all()

        serializer = self.get_serializer(cars, many=True)
        return Response(serializer.data)
    

class DealerViewSet(viewsets.ModelViewSet):
    queryset = Dealer.objects.all()
    serializer_class = DealerSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated] 
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Ensure the user trying to update the appointment is the owner
        if instance.user != request.user:
            return Response(
                {'error': 'You do not have permission to update this appointment.'}, 
                status=status.HTTP_403_FORBIDDEN
            )

        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Ensure the update is actually saved
        self.perform_update(serializer)

        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        appointment = self.get_object()
        if appointment.user != request.user:
            return Response({'error': 'You do not have permission to delete this appointment.'}, status=status.HTTP_403_FORBIDDEN)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset=UserProfile.objects.all()
    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'error': 'You do not have permission to update this profile.'}, status=403)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if 'image' in request.FILES:
            instance.avatar = request.FILES['image']  # Handle image file
        self.perform_update(serializer)

        return Response(serializer.data)


        return Response(serializer.data)
    def put(self, request, id):
        print(f"Received request to update profile for user ID: {id}")
        try:
            profile = self.get_object(request.user)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the response from the validated token
        response_data = serializer.validated_data
        response_data['user'] = {
            'id': serializer.user.id,
            'username': serializer.user.username,
            'email': serializer.user.email
        }

        return Response(response_data, status=status.HTTP_200_OK)


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get('currentPassword')
        new_password = request.data.get('newPassword')

        if not user.check_password(current_password):
            return Response({"currentPassword": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password updated successfully."})
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)