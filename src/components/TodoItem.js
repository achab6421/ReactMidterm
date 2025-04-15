import React, { useState } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // 處理編輯提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText !== todo.text) {
      updateTodo(todo.id, editText);
    } else if (!editText.trim()) {
      setEditText(todo.text); // 如果為空，恢復原始值
    }
    setIsEditing(false);
  };

  // 取消編輯
  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="todo-item d-flex align-items-center py-2 border-bottom">
      {!isEditing ? (
        // 顯示模式
        <>
          <div className="icheck-primary d-inline mr-2">
            <input 
              type="checkbox" 
              id={`todo-${todo.id}`}
              checked={todo.completed} 
              onChange={() => toggleComplete(todo.id)} 
            />
            <label htmlFor={`todo-${todo.id}`}></label>
          </div>
          <span 
            className={`flex-grow-1 ${todo.completed ? 'text-muted text-decoration-line-through' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </span>
          <div className="tools">
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-sm btn-info mr-1"
              title="編輯"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              onClick={() => deleteTodo(todo.id)} 
              className="btn btn-sm btn-danger"
              title="刪除"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </>
      ) : (
        // 編輯模式
        <form onSubmit={handleSubmit} className="d-flex w-100">
          <input
            type="text"
            className="form-control"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="input-group-append">
            <button 
              type="submit" 
              className="btn btn-success"
              title="儲存"
            >
              <i className="fas fa-check"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
              title="取消"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default TodoItem;
