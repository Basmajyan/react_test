import React,{ useState } from 'react'
import './static/css/App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Registration from './pages/registration';
import Login from './pages/login';
import Cookie from './pages/coocie';
import Page404 from './pages/404';
import Home from './pages/home';
import CreateTodo from './pages/create_todo';
import TodoList from './pages/todo_list';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

  
function App() {
  
  const [user, changeUser] = useState('')
  const [title,changeTitle] = useState('Register')
  const headers = [
    {id:1,link:'',title:'Главная',component:<Home/>},
    {id:2,link:'create_todo',title:'Создать заметку',component:<CreateTodo/>},
    {id:3,link:'todo_list',title:'Список заметок',component:<TodoList/>},
    {id:4,link:'api/create_todo',title:'Create todo',component:null},
  ]

  axios.get('/api/is_authenticated')
  .then(request => request.data[0])
  .then(request => changeUser(request))
  
  function change(){
    if (title === 'Register') {
      changeTitle('Login')      
    }else{
      changeTitle('Register')      
    }
  }

  return (
    <>
      <Cookie/>
      <Header headers={headers} user={user} changeUser={changeUser}/>
      <h2 onClick={change}>{title}</h2>

      <div className="content">
        <Routes>
          <Route path='' element={<Home/>}/>
          {!user ? <><Route path='/login' element={<Login changeUser={changeUser}/>}/>
                    <Route path='/registration' element={<Registration changeUser={changeUser}/>}/></>

                :<><Route path='/login' element={<Home/>}/>
                  <Route path='/registration' element={<Home/>}/></> }
          
          <Route path='/create_todo' element={<CreateTodo/>}/>
          <Route path='/todo_list' element={<TodoList/>}/>
          <Route path='*' element={<Page404/>}/>
        </Routes>        
      </div>
      <Footer/>
    </>
  );
}

export default App;
