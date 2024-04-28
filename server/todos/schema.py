import graphene
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation
from todos.serializers import TodoSerializer
from todos.models import Todo

class TodoType(DjangoObjectType):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'completed', 'created_at')

class Query(graphene.ObjectType):
  todos = graphene.List(TodoType)
  todo_by_id = graphene.Field(TodoType, id=graphene.ID())

  def resolve_todos(root, info, **kwargs):
    return Todo.objects.all()
  
  def resolve_todo_by_id(root, info, id):
    return Todo.objects.get(pk=id)
  
class CreateTodoMutation(SerializerMutation):
  class Meta:
    serializer_class = TodoSerializer
    model_operations = ['create']

class UpdateTodoMutation(SerializerMutation):
  class Meta:
    serializer_class = TodoSerializer
    model_operations = ['update']

class DeleteTodoMutation(graphene.Mutation):
  class Arguments:
    id = graphene.ID()

  ok = graphene.Boolean()
  todo = graphene.Field(TodoType)

  def mutate(root, info, id):
    todo = Todo.objects.get(pk=id)
    todo.delete()
    return DeleteTodoMutation(ok=True, todo=todo)

class Mutation(graphene.ObjectType):
  create_todo = CreateTodoMutation.Field()
  update_todo = UpdateTodoMutation.Field()
  delete_todo = DeleteTodoMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
