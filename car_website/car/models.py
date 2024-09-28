from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Brand(models.Model):
    name = models.CharField(max_length=255,unique=True)
    image = models.ImageField(upload_to='brands/', null=True)

    def __str__(self):
        return self.name
class CarModel(models.Model):
    name = models.CharField(max_length=255)
    brand = brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    year = models.IntegerField()
    price = models.CharField(max_length=255)
    image=models.ImageField(upload_to='cars/',null=True)
    engine=models.CharField(max_length=225,null=True)
    power=models.CharField(max_length=225,null=True)
    seating_capacity=models.IntegerField(null=True,validators=[MinValueValidator(1), MaxValueValidator(8)])
    drive_type=models.CharField(max_length=255,null=True)
    ground_clearance=models.CharField(max_length=255,null=True)
    torque=models.CharField(max_length=255,null=True)
    description=models.TextField(null=True)
    review=models.DecimalField(max_digits=2,decimal_places=1,validators=[MinValueValidator(1), MaxValueValidator(5)],null=True)

    def __str__(self):
        return f'{self.brand} {self.name} ({self.year})'

class Dealer(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    image=models.ImageField(upload_to="dealers/",null=True)
    car=models.ManyToManyField(CarModel,related_name='car')

    def __str__(self):
        return self.name

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car_model = models.ForeignKey(CarModel, on_delete=models.CASCADE)
    dealer = models.ForeignKey(Dealer, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    

    def __str__(self):
        return f'{self.user.username} - {self.car_model}'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    image = models.ImageField(upload_to='profiles/', null=True, blank=True, default='profiles/default.png')

    def __str__(self):
        return self.user.username
    

