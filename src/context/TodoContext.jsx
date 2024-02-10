import React, { createContext, useState, useContext, useEffect } from "react";

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoProvider = ({ children }) => {
     //GET TODOS FROM PERSISTANCE
  const getTodos = JSON.parse(localStorage.getItem("todos"));

  const [todos, setTodos] = useState(getTodos ? getTodos : []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };
   
  const clearAllTodos = () => {
    setTodos([]);
  };


   //TODOS PERSISTANCE
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        clearAllTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
