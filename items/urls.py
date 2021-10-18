from django.urls import path 
from .views import ItemListView, ItemDetailView, CurrentRenterView

urlpatterns = [
    path('', ItemListView.as_view()),
    path('<int:pk>/', ItemDetailView.as_view()),
    path('<int:pk>/currentrenter/', CurrentRenterView.as_view())
    # path('<int:pk>/currentrenterremove/', CurrentRenterRemoveView.as_view())
]