import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from "react"
import axios, { AxiosResponse, AxiosError } from "axios"
import { Todo } from "../interfaces"

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string>("")
  const [newTodo, setNewTodo] = useState<string>("")

  useEffect(() => {
    axios
      .get<Todo[]>("http://localhost:8000/api/todos/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: AxiosResponse) => {
        setTodos(res.data)
        setIsLoading(false)
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
  }, [])

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => {
      setError("")
    }, 8000)
    return () => clearTimeout(timer)
  }, [error])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios
      .post(
        "http://localhost:8000/api/todos/",
        { title: newTodo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: AxiosResponse) => {
        setNewTodo("")
        setTodos((prevTodos) => [...prevTodos, res.data])
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
  }

  const checkTodo = (event: ChangeEvent<HTMLInputElement>, todo: Todo) => {
    event.preventDefault()
    axios
      .put(
        `http://localhost:8000/api/todos/${todo.id}/`,
        {
          title: todo.title,
          completed: event.target.checked,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: AxiosResponse) => {
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo.id === todo.id
              ? { ...prevTodo, completed: res.data.completed }
              : prevTodo
          )
        )
      })
      .catch((error: AxiosError) => {
        handleError(error, todo.id)
      })
  }

  const deleteTodo = (event: MouseEvent<HTMLElement>, id: number) => {
    event.preventDefault()
    axios
      .delete(`http://localhost:8000/api/todos/${id}/`)
      .then((res: AxiosResponse) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
      })
      .catch((error: AxiosError) => {
        handleError(error, id)
      })
  }

  const handleError = (error: AxiosError, id?: number) => {
    console.log(error)
    if (error.code === "ERR_NETWORK") {
      setIsLoading(true)
      return setError("It looks like the backend server is down!")
    }
    if (error.response) {
      if (error.response.status === 404) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
        return setError(
          "That todo no longer exists, it has been removed from the list."
        )
      }
      if (error.response.status === 400) {
        return setError(
          "There was something wrong with that todo, perhaps it was too long (must be under 200 characters)."
        )
      }
    }
    return setError("An error occurred!")
  }

  return (
    <>
      <div className="error">{error}</div>
      {isLoading ? (
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
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  name="completed"
                  checked={todo.completed}
                  onChange={(e) => checkTodo(e, todo)}
                />
                <span>{todo.title}</span>
                <button onClick={(e) => deleteTodo(e, todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default TodoList
