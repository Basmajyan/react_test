import { useNavigate } from "react-router-dom"
import React from "react";
import axios from "axios";


export default function Registration(args){

    const [login,     changeLogin    ] = React.useState('')
    const [password,  changePassword ] = React.useState('')
    const [password2, changePassword2] = React.useState('')
    const [error, changeError] = React.useState('')
    const navigete = useNavigate()

    React.useEffect(() => {
        document.title = 'Registration';
    });

    function submitUser(){        
        if(login){
            if(password){
                if(password.length > 3){
                    if(password === password2){
                        let csrf = ''
                        let token = ''
                        
                        if (document.cookie){
                            csrf = document.cookie.split('; ')
                            for(let i in csrf){
                                if(csrf[i].includes('csrftoken')){
                                    token = csrf[i].replace("csrftoken=",'')
                                    break
                                }
                            }
                        }
                        axios.post('/api/registration', {
                            'username': login,
                            'password': password,
                            'X-CSRFToken': csrf,
                          })
                          .then(function (response) {
                            if (Object.keys(response.data)[0] === 'error'){
                                console.log("you have a error")
                                changeError(response.data.error)
                            }
                            else{
                                axios.get('/api/is_authenticated')
                                .then(request => request.data[0])
                                .then(request => args.changeUser(request))
                                changeError('')
                                changeLogin('')
                                changePassword('')
                                changePassword2('')
                                navigete('/')                    
                            }
                          })
                    }else{
                        changeError('Passwords do not match')
            
                    }
                }else{
                    changeError('Password not correct')
        
                }
            }else{
                changeError('Password not filing')
    
            }            
        }else{
            changeError('Login not filing')

        }

    }
    function pressEnter(e){
        if(e.keyCode === 13 && e.target.id === 'login'){
            if (e.target.value) {
                document.getElementById('password').focus()                    
                changeError('')
            }else{
                changeError('Login not filing')
            }
        }else if(e.keyCode === 13 && e.target.id === 'password'){
            if (e.target.value.length > 3) {                
                document.getElementById('password2').focus()
                changeError('')
            }else{
                changeError('Password not correct')
            }
        }else if(e.keyCode === 13 && e.target.id === 'password2'){
            if (e.target.value === document.getElementById('password').value) {                
                submitUser()
                changeError('')  
            }else{
                changeError('Passwords do not match')
            }
        }
    }
    return(
        <>
        {/* {users[0] ? users.map(i => {
            return ( <p>{i.login}</p> )
        }): <p> no users</p>} */}
        {/* <form onSubmit={submitUser} className="registrationDiv"> */}
        {/* <form onSubmit={submitUser} className="registrationDiv"> */}
        <div className="registrationDiv">
            <p>Registration</p>
            <span>Create account</span>
            <div className="forms">
                <input id="login"     onKeyDown={pressEnter} onChange={event => changeLogin(event.target.value)}     value ={login}     type="text"      placeholder="Login" />
                <input id="password"  onKeyDown={pressEnter} onChange={event => changePassword(event.target.value)}  value ={password}  type="password"  placeholder="Password" />
                <input id="password2" onKeyDown={pressEnter} onChange={event => changePassword2(event.target.value)} value ={password2} type="password"  placeholder="Reset password" />
            </div> 
            <p id="errortext">{error}</p>
            {/* <button type="submit" id="but" onClick={event => console.log( event.target.id)}>Create</button> */}
            <button onClick={submitUser} type="submit" id="but" >Create</button>
        </div>  
        </>
    )
}