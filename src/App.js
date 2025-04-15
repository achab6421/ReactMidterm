import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';
import { supabase } from './supabaseClient';

// 引入 AdminLTE 元件
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

function App() {
  const [todos, setTodos] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('未測試');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 從 Supabase 加載待辦事項
  useEffect(() => {
    fetchTodos();
  }, []);

  // 獲取所有待辦事項
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTodos(data || []);
      console.log('成功獲取待辦事項:', data);
    } catch (error) {
      console.error('獲取待辦事項失敗:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 新增待辦事項
  const addTodo = async (text) => {
    try {
      setIsLoading(true);
      const newTodo = {
        text,
        completed: false,
        user_id: 'anonymous', // 可以替換為實際使用者 ID
      };

      const { data, error } = await supabase
        .from('todos')
        .insert([newTodo])
        .select();

      if (error) {
        throw error;
      }

      console.log('成功新增待辦事項:', data);
      setTodos([...data, ...todos]);
      
    } catch (error) {
      console.error('新增待辦事項失敗:', error.message);
      alert('新增待辦事項失敗: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 切換待辦事項完成狀態
  const toggleComplete = async (id) => {
    try {
      // 找出要更新的項目
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      // 先樂觀更新 UI
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));

      // 然後更新資料庫
      const { data, error } = await supabase
        .from('todos')
        .update({ completed: !todoToUpdate.completed })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      console.log('成功更新待辦事項狀態:', data);
    } catch (error) {
      console.error('更新待辦事項狀態失敗:', error.message);
      
      // 如果資料庫更新失敗，回滾 UI 更新
      fetchTodos();
    }
  };

  // 刪除待辦事項
  const deleteTodo = async (id) => {
    try {
      // 先樂觀更新 UI
      setTodos(todos.filter(todo => todo.id !== id));

      // 然後從資料庫刪除
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      console.log('成功刪除待辦事項');
    } catch (error) {
      console.error('刪除待辦事項失敗:', error.message);
      
      // 如果資料庫刪除失敗，重新獲取數據
      fetchTodos();
    }
  };

  // 更新待辦事項
  const updateTodo = async (id, newText) => {
    try {
      // 找出要更新的項目
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      // 先樂觀更新 UI
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      ));

      // 然後更新資料庫
      const { data, error } = await supabase
        .from('todos')
        .update({ text: newText })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      console.log('成功更新待辦事項內容:', data);
    } catch (error) {
      console.error('更新待辦事項內容失敗:', error.message);
      
      // 如果資料庫更新失敗，回滾 UI 更新
      fetchTodos();
    }
  };

  // 測試 Supabase 連接
  const testConnection = async () => {
    setIsLoading(true);
    try {
      // 嘗試從 Supabase 獲取數據
      const { data, error } = await supabase
        .from('todos')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('連接測試失敗:', error);
        setConnectionStatus(`連接失敗: ${error.message}`);
      } else {
        console.log('連接測試成功:', data);
        setConnectionStatus('連接成功！資料庫可用');
      }
    } catch (error) {
      console.error('連接測試失敗:', error.message);
      setConnectionStatus(`連接失敗: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />

      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">待辦事項清單</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">首頁</a></li>
                  <li className="breadcrumb-item active">待辦事項清單</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {/* Connection Test Card */}
                
                {/* Todo Form Card */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">新增待辦事項</h3>
                  </div>
                  <div className="card-body">
                    <AddTodoForm addTodo={addTodo} isLoading={isLoading} />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger alert-dismissible">
                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <h5><i className="icon fas fa-ban"></i> 錯誤！</h5>
                    {error}
                  </div>
                )}

                {/* Todo List Card */}
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">待辦事項列表</h3>
                  </div>
                  <div className="card-body">
                    {isLoading && todos.length === 0 ? (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">載入中...</span>
                        </div>
                      </div>
                    ) : (
                      <TodoList 
                        todos={todos} 
                        toggleComplete={toggleComplete} 
                        deleteTodo={deleteTodo} 
                        updateTodo={updateTodo} // 新增編輯功能
                        isLoading={isLoading}
                      />
                    )}
                  </div>
                  <div className="card-footer">
                    共有 {todos.length} 個待辦事項
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;
