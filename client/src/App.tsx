import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoListGraphql from './components/TodoListGraphql';

function App() {
  const [showGql, setShowGql] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowGql(!showGql)}>
        {showGql ? 'Show API View' : 'Show GraphQL View'}
      </button>
      {showGql ? <TodoListGraphql /> : <TodoList />}
    </div>
  );
}

export default App;
