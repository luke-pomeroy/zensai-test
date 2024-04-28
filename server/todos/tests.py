from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from todos.models import Todo
from todos.serializers import TodoSerializer
import json

class TodoTestCase(APITestCase):
  def setUp(self):
    Todo.objects.create(title='Test Todo 1')
    Todo.objects.create(title='Test Todo 2')

  def test_get_all_todos(self):
    url = reverse('todo-list')
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    response = self.client.get(url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data, serializer.data)

  def test_get_todo(self):
    todo = Todo.objects.get(title='Test Todo 1')
    url = reverse('todo-detail', kwargs={'pk': todo.id})
    serializer = TodoSerializer(todo)
    response = self.client.get(url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data, serializer.data)

  def test_post_todo(self):
    data = { 'title': 'Test Todo 3' }
    url = reverse('todo-list')
    response = self.client.post(url, data, format='json')
    todo = Todo.objects.get(title='Test Todo 3')
    serializer = TodoSerializer(todo)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(response.data, serializer.data)

  def test_put_todo(self):
      todo = Todo.objects.get(title='Test Todo 1')
      url = reverse('todo-detail', kwargs={'pk': todo.id})
      data = { 
         'title': 'Test Todo 1', 
         'completed': True 
         }
      response = self.client.put(url, data, format='json')
      print(response.reason_phrase)
      self.assertEqual(response.status_code, status.HTTP_200_OK)
      self.assertEqual(response.data['completed'], True)

  def test_delete_todo(self):
      todo = Todo.objects.get(title='Test Todo 1')
      url = reverse('todo-detail', kwargs={'pk': todo.id})
      response = self.client.delete(url, format='json')
      self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
      self.assertFalse(Todo.objects.filter(pk=todo.id).exists())
