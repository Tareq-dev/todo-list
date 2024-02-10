import React, { useState } from "react";
import { useTodoContext } from "./../context/TodoContext";

const TodoList = ({ filter }) => {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useTodoContext();
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const handleEdit = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleSaveEdit = (id) => {
    if (editTodoText.trim() !== "") {
      updateTodo({
        id: id,
        text: editTodoText,
        completed: false,
      });
      setEditTodoId(null);
      setEditTodoText("");
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "complete") {
      return todo.completed;
    } else if (filter === "incomplete") {
      return !todo.completed;
    }
    return true; 
  });

  return (
    <div className="mt-4 mx-2 md:mx-0 ">
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col md:flex-row items-center  justify-between bg-white shadow-md p-4 rounded-lg"
          >
            <div className="flex items-center mb-2 md:mb-0 w-full md:w-auto">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  onBlur={() => handleSaveEdit(todo.id)}
                  className="border-b border-dotted border-gray-500 focus:outline-none flex-1"
                />
              ) : (
                <span
                  className={`text-lg ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {editTodoId === todo.id ? (
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="text-gray-500 hover:text-gray-600 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
