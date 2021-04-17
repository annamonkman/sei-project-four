from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from django.conf import settings
import jwt

from .serializers.common import UserSerializer

User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        # run user through serializer
        user_to_create = UserSerializer(data=request.data)
        # check if user is valid
        if user_to_create.is_valid():
            user_to_create.save() # save to db
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        # get some data off the request
        email = request.data.get('email')
        password = request.data.get('password')

        # get the user from the db - use email address
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid credentials')
        if not user_to_login.check_password(password): # check password against hashed version in db
            raise PermissionDenied(detail='Invalid credentials')
        
        dt = datetime.now() + timedelta(days=7) # generate expiry for token

        # generate a token
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({ 'token': token, 'message': f'Welcome back {user_to_login.first_name}'})





# class WishlistView(APIView):

# def addproduct(request, id):
#     item=get_object_or_404(Product, id=id)
#     user = User()
#     user.items.add(item)
#     return render(request, 'thispage.html')

# def removeproduct(request, id):


#     def post(self, request, pk):
#         current_user = request.user
#         item = wishlist(userid_id = current_user.id)
#         item.save()
#         return

#     def post(self, request, item_id):
#         item = 
#         user_profile = get_or_create(UserProfile, user=request.user)
#         user_profile.wishlist.add(item)

        # print every poitn - make sure have correct ids
        # once have id of user and id of item 
