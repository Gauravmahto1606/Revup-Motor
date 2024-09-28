from django.contrib import admin
from .models import CarModel,Dealer,Appointment,UserProfile,Brand
# Register your models here.
admin.site.register(CarModel)
admin.site.register(Dealer)
admin.site.register(Appointment)
admin.site.register(UserProfile)
admin.site.register(Brand)
