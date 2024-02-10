import React, { useState } from "react";
import { useTodoContext } from "./context/TodoContext";
import TodoList from "./components/TodoList";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const { addTodo, todos, clearAllTodos } = useTodoContext();
  const [filter, setFilter] = useState("all");

  //ADD TODO
  const handleAddTodo = () => {
    if (inputTodo.trim() !== "") {
      addTodo({
        id: new Date().getTime(),
        text: inputTodo,
        completed: false,
      });
      toast.success("Todo created!!");
      setInputTodo("");
    } else {
      toast.error("Input field required");
    }
  };
  //CLEAR ALL TODOS
  const handleClearTodos = () => {
    clearAllTodos();
    toast.success("All todos cleared!!");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="pb-10 py-16">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Todo</h1>
        {/* TODOS CREATE FORM */}
        <div className="flex items-center mx-2 md:mx-0 gap-2">
          <input
            type="text"
            className="border border-black md:w-[500px] h-12 rounded-md outline-none shadow px-4"
            placeholder="Create Todos.."
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 bg-purple-400 rounded-full text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        {/* TODOS FILTERING */}

        {todos.length === 0 ? (
          <p className="text-center mt-20 text-lg font-bold text-white">
            No todo added. Please Add Some..
          </p>
        ) : (
          <div className="flex mx-2 md:mx-0 flex-wrap gap-3 mt-4">
            <button
              className={`${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-400 text-white"
              } rounded px-3 py-1 text-sm font-semibold`}
              onClick={() => setFilter("all")}
            >
              All Task: {todos.length}
            </button>
            <button
              className={`${
                filter === "incomplete"
                  ? "bg-red-700 text-white"
                  : "bg-red-500 text-white"
              } rounded px-3 py-1 text-sm font-semibold`}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete: {todos.filter((todo) => !todo.completed).length}
            </button>
            <button
              className={`${
                filter === "complete"
                  ? "bg-green-700 text-white"
                  : "bg-green-500 text-white"
              } rounded px-3 py-1 text-sm font-semibold`}
              onClick={() => setFilter("complete")}
            >
              Complete: {todos.filter((todo) => todo.completed).length}
            </button>
            <button
              className="bg-gray-500 text-white rounded px-3 py-1 text-sm font-semibold"
              onClick={handleClearTodos}
            >
              Clear All
            </button>
          </div>
        )}

        {/* TODOS LIST SHOWN ON UI */}
        <TodoList filter={filter} />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
