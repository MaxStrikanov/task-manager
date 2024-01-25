import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import uuid from 'react-uuid';
import Header from './Components/Header/Header';
import TaskForm from './Components/Task/TaskForm';
import TaskList from './Components/Task/TaskList';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: uuid(), text, completed: false }]);
  };

  const editTodo = (id, text) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const moveTodo = (fromIndex, toIndex) => {
    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, movedTodo);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <Header/>
      <TaskForm addTodo={addTodo} />
      <DndProvider backend={HTML5Backend}>
        <TaskList
          todos={todos}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          moveTodo={moveTodo}
        />
      </DndProvider>
    </div>
  );
}

export default App;