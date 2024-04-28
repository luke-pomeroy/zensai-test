from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from todos import views
from graphene_django.views import GraphQLView
from todos.schema import schema

router = routers.DefaultRouter()
router.register(r'todos', views.TodoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema)))
]
