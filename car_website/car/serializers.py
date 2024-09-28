from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CarModel, Dealer, Appointment, UserProfile,Brand

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email']
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        # Create the user with a hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

class CarModelSerializer(serializers.ModelSerializer):
    brand = serializers.StringRelatedField()
    class Meta:
        model = CarModel
        fields = '__all__'

class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'phone', 'address', 'image']

    def update(self, instance, validated_data):
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        
        # Handle image update
        image = validated_data.get('image', None)
        if image:
            instance.image = image
        
        instance.save()
        return instance


class DealerSerializer(serializers.ModelSerializer):
    car = CarModelSerializer(many=True)  # Nested CarModel serializer

    class Meta:
        model = Dealer
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'
        
        


    