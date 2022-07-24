import { useNavigate } from "react-router-dom"
import React, {useEffect} from "react";
import axios from "axios";



export default function Login(args){

    const [login,     changeLogin    ] = React.useState('')
    const [password,  changePassword ] = React.useState('')
    const [error, changeError] = React.useState('')
    const navigete = useNavigate()


    useEffect(() => {
        document.title = 'Login';
    });


    function submitUser(){         
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
        
        if(password && login){
            axios.post('/api/login', {
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
                    navigete('/')                    
                }
              })
        }
        else{
            changeError('Incorrect form filling')
        }
    }

    function pressEnter(e){
        if(e.keyCode === 13 && e.target.id === 'password'){
            if (document.getElementById('login').value) {
                if (e.target.value.length > 3) {
                    submitUser()
                    changeError('')                
                }else{
                    changeError('Password not filing')
                }
            }else{
                changeError('login not filing') 
            }
            
        }
        else if(e.keyCode === 13 && e.target.id === 'login'){
            if (e.target.value) {                
                document.getElementById('password').focus()
                changeError('')
            }else{
                changeError('login not filing')
            }
        }
    }

    return(
        <>
        <div className="registrationDiv">
            <p>Login</p>
            <span>Sign in</span>
            <div className="forms">
                <input id="login"    onKeyDown={pressEnter} onChange={event => changeLogin(event.target.value)}     value ={login}     type="text"      placeholder="Login" />
                <input id="password" onKeyDown={pressEnter} onChange={event => changePassword(event.target.value)}  value ={password}  type="password"  placeholder="Password" />
            </div> 
            <p id="errortext">{error}</p>
            {/* <button type="submit" id="but" onClick={event => console.log( event.target.id)}>Create</button> */}
            <button onClick={submitUser} type="submit" id="but" >Sign in</button>
        </div>      
        </>
    )
}