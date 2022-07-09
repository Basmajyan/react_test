import React from "react";


export default function Login(args){
    const [users, changeUsers] = React.useState([])

    const [login,     changeLogin    ] = React.useState('')
    const [password,  changePassword ] = React.useState('')


    const [error, changeError] = React.useState('')

    function submitUser(){
        let userId = 0
        console.log(users.length);
        if (users.length > 0){
            userId = users.length   
        }   
        let user = {
            'id':userId,
            'login':login,
            'password':password
        }
        if(password && login){
            users.push(user)
            changeUsers(users)
            changeError('')
            changeLogin('')
            changePassword('')
        }
        else{
            changeError('Incorrect form filling')
        }
        console.log(users)

    }
    return(
        <>
        <div className="registrationDiv">
            <p>Login</p>
            <span>Sign in</span>
            <div className="forms">
                <input onChange={event => changeLogin(event.target.value)}     value ={login}     type="text"      placeholder="Login" />
                <input onChange={event => changePassword(event.target.value)}  value ={password}  type="password"  placeholder="Password" />
            </div> 
            <p id="errortext">{error}</p>
            {/* <button type="submit" id="but" onClick={event => console.log( event.target.id)}>Create</button> */}
            <button onClick={submitUser} type="submit" id="but" >Sign in</button>
        </div>  
        {users[0] ? users.map(i => {
                    return ( 
                        <div key={i.id} className="userLoginDiv">
                            <p ><span>Login: </span>{i.login}</p> 
                        </div>
                        )                    
                }): <p> no users</p>}
        </>
    )
}