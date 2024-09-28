from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarModelViewSet, DealerViewSet, AppointmentViewSet, UserProfileViewSet,RegisterView,BrandViewSet,ChangePasswordView,UserProfileView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView
router = DefaultRouter()
router.register('car-models', CarModelViewSet)
router.register('dealers', DealerViewSet)
router.register('appointments', AppointmentViewSet)
router.register('brands', BrandViewSet)
# router.register(r'profile', UserProfileViewSet, basename='userprofile')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
    path('api/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]





