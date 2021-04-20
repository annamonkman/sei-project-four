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
    def put(self, request, pk):
    # # get user id
        user = request.data.get('id')
        item = Item.objects.get(pk=pk)
        updated_item = ItemSerializer(item, data=request.data)
        # print('UPDATED ITEM DATA>>>>', updated_item.data)
        if updated_item.is_valid():
            
            updated_item.save()
            return Response(updated_item.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_item.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# current_renter = null frontend, in front end when pullng tpgether data to send jsut have to send that with null instead of current user

# class CurrentRenterRemoveView(APIView):
#     def put(self, request, pk):
#         user = request.data.get('id')
#         item = Item.objects.get(pk=pk)
#         updated_item = ItemSerializer(item, data=request.data)
#         # print('UPDATED ITEM DATA>>>>', updated_item.data)
#         if updated_item.is_valid():
            
#             updated_item.save()
#             return Response(updated_item.data, status=status.HTTP_202_ACCEPTED)
#         return Response(updated_item.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)  
        