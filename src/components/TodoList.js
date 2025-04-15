import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, deleteTodo, updateTodo, isLoading }) {
  if (isLoading && todos.length === 0) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">載入中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fas fa-info-circle mr-2"></i> 目前沒有待辦事項
        </div>
      ) : (
        todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo}
            updateTodo={updateTodo} // 傳遞編輯功能
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
