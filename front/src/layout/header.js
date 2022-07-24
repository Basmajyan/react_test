import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';



export default function Header(args){
    const navigate = useNavigate()
    function logOut() {
        axios.get('/api/logout')    
        axios.get('/api/is_authenticated')
        .then(function (request) {args.changeUser(request.data[0])})
        navigate('/login')
    }
    return(
        <div className="header">
            <div><p className='logo'>LogoName</p></div>
            <div className='urlDiv'>
                {args.headers.map(headers => {
                    return ( <Link key={headers.id} to={headers.link}>{headers.title}</Link> )
                })}
                {args.user ? <p>{args.user} / <a onClick={() => logOut()}>LogOut</a></p>
                : 
                    <>
                        <Link to='login'>Login</Link>
                        <Link to='registration'>Registration</Link>
                    </> 
                }
            </div>
        </div>
    )
}