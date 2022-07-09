import React,{ useState } from 'react'
import './static/css/App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Registration from './pages/registration';
import Login from './pages/login';
import Cookie from './pages/coocie';
import Page404 from './pages/404';
import { Routes, Route } from 'react-router-dom'

function App() {

  
  const headers = [
    {id:1,link:'home',title:'Главная'},
    {id:1,link:'login',title:'Логин'},
    {id:1,link:'registration',title:'Регисстрация'},
    {id:2,link:'home2',title:'Контакты'},
    {id:3,link:'home3',title:'О нас'},
  ]
  const [title,changeTitle] = useState('Register')

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
    <Header headers={headers}/>
    {/* <h2 onClick={(() => change('title'))}>{title}</h2> */}
    <h2 onClick={change}>{title}</h2>

    <div className="content">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
      

      
    </div>
    <Footer/>
    </>
  );
}

export default App;
