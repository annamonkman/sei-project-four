from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import UserSerializer

# import logging
# log = logging.getLogger(__name__)

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

class UserListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def get(self, _request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

class UserDetailView(APIView):

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail=" Cannot find that user")

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        print(user)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)



class WishlistView(APIView):
    def put(self, request, pk):
        #get user
        user = User.objects.get(pk=pk)
        print('user>>>>>>>', user)
        print('userWishlist >>>>>>>', user.wishlist_items)
        #get item id off request
        item = request.data.get('id')
        print('item id>>>>>>>', item)
        # add item to wishlist that is on user and then save it
        if user:
            # wishlist.add(item)
            user.wishlist_items.add(item)
            # item.add()
            user.save() 
            return Response(item, status=status.HTTP_202_ACCEPTED)
        return Response(user.wishlist_items.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class WishListRemoveView(APIView):
    def put(self, request, pk):
        # get user and item id
        user = User.objects.get(pk=pk)
        item = request.data.get('id')

        # check if item on users wishlist , if on, take off
        if item:
            user.wishlist_items.remove(item)
            user.save()
            return Response(item, status=status.HTTP_200_OK)
        return Response(user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
