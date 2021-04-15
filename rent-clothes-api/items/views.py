from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Item 
from .serializers.common import ItemSerializer

class ItemListView(APIView):
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