
# Zensai coding test
The task for this take-home test was to:
* Use Django REST Framework to create a simple todo list, using a serializer and creating views to handle CRUD operations.
* Implement a GraphQL API using Graphene Django for the todo list (optional).
* Create a frontend for the Django Rest Framework API using Create React App, with a component to display the todo list items, and allow updating of the completion status directly from the component.
* Integrate Apollo Client into the frontend to fetch and manage data from the GraphQL API implemented in Django (optional).
* Handle errors gracefully, providing meaningful feedback; focus on functionality rather than complex styling; use appropriate naming conventions and best practices.

## Description of solution
### Basic summary
* Django REST Framework has been implemented on the backend, with a serializer and a ModelViewSet for the todos.
* There are some tests for the Django REST Framework todos app in server/todos/tests.py.
* The backend also includes a GraphQL implementation using Graphene Django.
* The frontend has two components (one for REST Framework, and one for Apollo Client) that can be toggled using a button.
* The styling is very basic, with a focus on functionality.

### Further ideas/solutions
* The GraphQL query is refetched each time a todo is added/edited, it would be better to update the Apollo Client Cache than refresh each time.
* Authentication could be implemented via REST Framework TokenAuthentication or SessionAuthentication; then the app modified so a user only sees their own todos.
* The styling could be improved via TailwindCSS or a similar CSS library/framework.

## Installation
In the 'server' directory, create a virtual environment:
```
python3 -m venv env
```
Activate the virtual environment:
```
source env/bin/activate
```
Install the backend dependencies:
```
pip install -r requirements.txt 
```
Migrate the database for todos app:
```
python3 manage.py migrate todos
```
In the 'client' directory install the frontend dependencies:
```
npm install
```
## Execution
To run the backend tests, in the 'server' directory run:
```
./manage.py test
```
To run the server, in the 'server' directory run:
```
python3 manage.py runserver
```
To run the client, in the 'client' directory run:
```
npm start
```

The backend Django REST Framework API is accessible at: http://localhost:8080/api/
The backend GraphQL API is accessible at: http://localhost:8080/graphql
The frontend React app is accessible at: http://localhost:3000
