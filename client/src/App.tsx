import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoListGraphql from './components/TodoListGraphql';

function App() {
  const [showGql, setShowGql] = useState(false);

  return (
    <div className="App">
      <h1>{showGql ? 'Apollo Client Component': 'Django Rest Framework Component'}</h1>
      <button onClick={() => setShowGql(!showGql)}>
        {showGql ? 'Show Django Rest Framework Component' : 'Show Apollo Client Component'}
      </button>
      {showGql ? <TodoListGraphql /> : <TodoList />}
    </div>
  );
}

export default App;
