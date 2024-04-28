from django.urls import path, include
from rest_framework import routers
from todos import views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoViewSet)

urlpatterns = [
    path('api/', include(router.urls))
]
