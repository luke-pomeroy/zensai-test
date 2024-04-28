export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoResult {
  todos: Array<Todo>;
}
