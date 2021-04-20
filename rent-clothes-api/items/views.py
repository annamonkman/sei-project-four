from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Item 
from .serializers.common import ItemSerializer

class ItemListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def get(self, _request):
        items = Item.objects.all()
        serialized_items = ItemSerializer(items, many=True)
        return Response(serialized_items.data, status=status.HTTP_200_OK)


class ItemDetailView(APIView):

    def get_item(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise NotFound(detail="👚 Cannot find that item")

    def get(self, _request, pk):
        item = self.get_item(pk=pk)
        serialized_item = ItemSerializer(item)
        return Response(serialized_item.data, status=status.HTTP_200_OK)


class CurrentRenterView(APIView):
    def post(self, request, pk):
    # # get user id
        user = request.data.get('id')
    #     print('USER>>>>', user)
    # # get item id
    #     item = Item.objects.get(pk=pk)
    #     print('ITEM.CURRENT RENTER>>>>', item.current_renter)
    # # add to current_renter
    #     if item:
    #         item.update(current_renter=user)
    #         item.save()
    #         return Response(user, status=status.HTTP_202_ACCEPTED)
    #     return Response(user.wishlist_items.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        item = Item.objects.get(pk=pk)
        updated_item = ItemSerializer(item, data=request.data)
        if updated_item.is_valid():
            updated_item.save()
            return Response(updated_item.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_item.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# class CurrentRenterRemoveView(APIView):
#     def post(self, request, pk):
            
        