import { useState, FormEvent } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { TodoResult } from '../interfaces';
import { Todo } from '../interfaces';

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodo($title: String!) {
    createTodo(input: { title: $title }) {
      id
      title
      completed
      createdAt
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: Int!, $completed: Boolean, $title: String!) {
    updateTodo(input: { id: $id, completed: $completed, title: $title }) {
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      ok
    }
  }
`;

const TodoListGraphql = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const { data, error, loading } = useQuery<TodoResult>(GET_TODOS);

  {
    /*TODO: We are refetching here, but it would be better to update the cache with changes*/
  }
  const [createTodo] = useMutation<{ createTodo: Todo }>(CREATE_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const [updateTodo] = useMutation<{ updateTodo: Todo }>(UPDATE_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const [deleteTodo] = useMutation<{ deleteTodo: Todo }>(DELETE_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ variables: { title: newTodo } });
    setNewTodo('');
  };

  return (
    <>
      <div className="error">{error?.message}</div>
      {loading || !data ? (
        <div>Loading todos...</div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newTodo}
              placeholder="Enter a new todo..."
              aria-label="Create new Todo"
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="submit" disabled={!newTodo}>
              Add Todo
            </button>
          </form>

          <ul>
            {data.todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  name="completed"
                  checked={todo.completed}
                  onChange={(e) =>
                    updateTodo({
                      variables: {
                        id: Number(todo.id),
                        title: todo.title,
                        completed: !todo.completed,
                      },
                    })
                  }
                />
                <span>{todo.title}</span>
                <button
                  onClick={() => deleteTodo({ variables: { id: todo.id } })}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default TodoListGraphql;
