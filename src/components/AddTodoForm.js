import React, { useState } from 'react';

function AddTodoForm({ addTodo, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input 
          type="text" 
          className="form-control"
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="輸入新待辦事項..." 
          disabled={isLoading}
        />
        <div className="input-group-append">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                處理中...
              </>
            ) : (
              <>
                <i className="fas fa-plus mr-1"></i> 新增
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddTodoForm;
