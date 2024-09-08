# Create your views here.
from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Token, LostItem, FoundItem
from .serializers import UserSerializer, TokenSerializer, LostItem_Serializer, FoundItem_Serializer, OwnerSerializer
from django.conf import settings
import hashlib
import uuid
from django.utils import timezone
from django.http.response import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User


SALT = '282eb8da21117409e1812b925295643904d7651a3486118495230164b9cc9f93'
URL = "http://localhost:5173"


def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: "Verdana", serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""


# Create your views here.
class ResetPasswordView(APIView):
    def post(self, request, format=None):
        user_id = request.data["id"]
        token = request.data["token"]
        password = request.data["password"]

        token_obj = Token.objects.filter(
            user_id=user_id).order_by("-created_at")[0]
        if token_obj.expires_at < timezone.now():
            return Response(
                {
                    "success": False,
                    "message": "Password Reset Link has expired!",
                },
                status=status.HTTP_200_OK,
            )
        elif token_obj is None or token != token_obj.token or token_obj.is_used:
            return Response(
                {
                    "success": False,
                    "message": "Reset Password link is invalid!",
                },
                status=status.HTTP_200_OK,
            )
        else:
            token_obj.is_used = True
            hashed_password = make_password(password=password, salt=SALT)
            ret_code = User.objects.filter(
                id=user_id).update(password=hashed_password)
            if ret_code:
                token_obj.save()
                return Response(
                    {
                        "success": True,
                        "message": "Your password reset was successfully changed!",
                    },
                    status=status.HTTP_200_OK,
                )


class ForgotPasswordView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "User with this email does not exist.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        created_at = timezone.now()
        expires_at = timezone.now() + timezone.timedelta(1)
        salt = uuid.uuid4().hex
        token = hashlib.sha512(
            (str(user.id) + user.password + created_at.isoformat() + salt).encode(
                "utf-8"
            )
        ).hexdigest()
        token_obj = {
            "token": token,
            "created_at": created_at,
            "expires_at": expires_at,
            "user_id": user.id,
        }
        serializer = TokenSerializer(data=token_obj)
        if serializer.is_valid():
            serializer.save()
            subject = "Forgot Password Link"
            content = mail_template(
                "We have received a request to reset your password. Please reset your password using the link below.",
                f"{URL}/resetPassword?id={user.id}&token={token}",
                "Reset Password",
            )
            send_mail(
                subject=subject,
                message=content,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                html_message=content,
            )
            return Response(
                {
                    "success": True,
                    "message": "A password reset link has been sent to your email.",
                },
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {
                    "success": False,
                    "message": error_msg,
                },
                status=status.HTTP_200_OK,
            )



class RegistrationView(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "success": True, 
                    "message": "You are now registered on our website!",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_201_CREATED,  # Change status code to 201 Created
            )
        else:
            error_msg = " ".join([f"{key}: {serializer.errors[key][0]}" for key in serializer.errors])
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_400_BAD_REQUEST,  # Change status code to 400 Bad Request
            )
        

class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")
        print(password)
        try:
            user = User.objects.get(email=email) # authenticate(email=email, password=password)
        except User.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "User Does not Exist",
                },
                status=status.HTTP_200_OK,
            )
        
        user = authenticate(email, password = password)

        if user is None : # or not check_password(password, user.password):
            return Response(
                {
                    "success": False,
                    "message": "Invalid Login Credentials!",
                },
                status=status.HTTP_200_OK,
            )
        else:
            user_details = {
            "id": user.id,
            "first_name": user.username,
            "email": user.email,
        }
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "success": True, 
                    "message": "You are now logged in!",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": user_details
                },
                status=status.HTTP_200_OK,
            )


class LostItemView(APIView):
    # # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get_LostItem(self, pk=None):
        try:
            lost_item = LostItem.objects.get(id=pk)
            return lost_item
        except LostItem.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Lost item with such name does not exist.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def get(self, request, pk=None):
        if pk:
            data = self.get_LostItem(pk)
            if isinstance(data, JsonResponse):  # Check if get_LostItem returned an error response
                print("bye")
                return data
            serializer = LostItem_Serializer(data)
            return Response(serializer.data)#, safe=False)
        else:
            data = LostItem.objects.all()
            serializer = LostItem_Serializer(data, many=True)
            return Response(serializer.data)#, safe=False, json_dumps_params={'indent': 2})

    def post(self, request):
        data = request.data
        print(data)
        serializer = LostItem_Serializer(data=data)

        if serializer.is_valid():
            serializer.save()
            print("Hello")
            return Response("Lost Item Added Successfully")#, safe=False)
        print("World")
        return Response("Failed to Add Lost Item")#, safe=False)

    def put(self, request, pk=None):
        try:
            LostItem_to_update = LostItem.objects.get(id=pk)
        except LostItem.DoesNotExist:
            return Response("Lost Item does not exist", safe=False, status=status.HTTP_404_NOT_FOUND)

        serializer = LostItem_Serializer(instance=LostItem_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("LostItem updated Successfully", safe=False)
        return Response("Failed To Update LostItem")

    def delete(self, request, pk):
        try:
            LostItem_to_delete = LostItem.objects.get(id=pk)
        except LostItem.DoesNotExist:
            return Response("Lost Item does not exist", status=status.HTTP_404_NOT_FOUND)
        LostItem_to_delete.delete()
        return Response("LostItem Deleted Successfully")


class FoundItemView(APIView):
    # authentication_classes = [JWTAuthentication]
   # permission_classes = [IsAuthenticated]

    def get_FoundItem(self, id):
        try:
            return FoundItem.objects.get(id=id)
        except FoundItem.DoesNotExist:
            return None

    def get(self, request, pk=None):
        if pk:
            found_item = self.get_FoundItem(pk)
            if not found_item:
                return Response(
                    {
                        "success": False,
                        "message": "Found item with such ID does not exist.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer = FoundItem_Serializer(found_item)
        else:
            data = FoundItem.objects.all()
            serializer = FoundItem_Serializer(data, many=True)
        return Response(serializer.data)


    def post(self, request):
        data = request.data
        mut = data.copy()
        mut['keywords'] = []
        serializer = FoundItem_Serializer(data=data)
        print(data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Found Item Added Successfully", safe=False)
        print(serializer.errors)  # Add this line to see what the errors are
        return JsonResponse("Failed to Add Found Item", safe=False)

    def put(self, request, pk=None):
        try:
            FoundItem_to_update = FoundItem.objects.get(FoundItemId=pk)
        except FoundItem.DoesNotExist:
            return JsonResponse("Lost Item does not exist", safe=False, status=status.HTTP_404_NOT_FOUND)

        serializer = FoundItem_Serializer(instance=FoundItem_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("FoundItem updated Successfully", safe=False)
        return JsonResponse("Failed To Update FoundItem")

    def delete(self, request, pk):
        print('pk', pk)
        try:
            found_item = FoundItem.objects.get(id=pk)
            print(found_item)
            print('hello')
            found_item.delete()
            return JsonResponse("FoundItem Deleted Successfully")
        except FoundItem.DoesNotExist:
            print('bye')
            return JsonResponse("FoundItem does not exist", status=status.HTTP_404_NOT_FOUND)



def get_user_name_by_id(request, id):
    users = User.objects.all().values('id', 'first_name', 'email')
    user = User.objects.get(id = id)
    serializer = OwnerSerializer(user)
    return JsonResponse(serializer.data)



class CurrentUserDetailView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user  # Retrieve the currently authenticated user
        serializer = UserSerializer(user)  # Serialize the user instance
        return Response(serializer.data, status=status.HTTP_200_OK)
    


def send_email(request):
    if request.method == 'POST':
        from_email = request.data.get('from_email')
        to_email = request.data.get('to_email')
        subject = request.data.get('subject')
        message = request.data.get('message')
        
        try:
            send_mail(subject, message, from_email, [to_email])
            return JsonResponse({'message': 'Email sent successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)