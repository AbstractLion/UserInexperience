import React from 'react';

const TodoItemsContext = React.createContext({
  todos: [],
  setTodos: () => {},
});

export default TodoItemsContext;