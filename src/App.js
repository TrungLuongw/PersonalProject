
import './App.css';
import { useState,useEffect } from 'react';
import Todolist from './components/TodoList/TodoList';
import Form from './components/Form/Form';
import { getTodos,strorage } from './helper/localStorage';
function App() {
  
  const [inputText,setInputText] = useState('');
  const [todos,setTodos] = useState(()=>{
    return getTodos();
  });
  const [status,setStatus] = useState('all');
  useEffect(()=>{
    strorage(todos);
  },[todos])
  return (
    <div className="App">
      <header className='app-header'>
        <h1>Trung's todolist</h1>
      </header>
      <div>
        <Form status = {status} inputText={inputText} setStatus={setStatus} setInputText={setInputText} todos={todos} setTodos={setTodos}/>
        <Todolist status = {status} todos={todos} setTodos={setTodos}></Todolist>
      </div>
    </div>
  );
}

export default App;
