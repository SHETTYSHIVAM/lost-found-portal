from django.urls import path
from .views import RegistrationView, LoginView, ForgotPasswordView, ResetPasswordView, CurrentUserDetailView, LostItemView, FoundItemView, get_user_name_by_id, send_email
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('lost-items/', LostItemView.as_view(), name='lost-items'),
    path('lost-items/<int:pk>/', LostItemView.as_view(), name='lost-item-detail'),
    path('found-items/', FoundItemView.as_view(), name='found-items'),
    path('found-items/<int:pk>/', FoundItemView.as_view(), name='found-item-detail'),
    path('get-username/<int:id>', get_user_name_by_id, name='get_user_name_by_id'),
    path('current-user/', CurrentUserDetailView.as_view(), name='current_user_detail'),
    path('send-mail/', send_email, name="email")
]