import React from "react";


export default function Registration(args){
    const [users, changeUsers] = React.useState([])

    const [login,     changeLogin    ] = React.useState('')
    const [password,  changePassword ] = React.useState('')
    const [password2, changePassword2] = React.useState('')

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
            'password':password,
            'password2':password2
        }
        if(password && password2 === password){
            users.push(user)
            changeUsers(users)
            changeError('')
            changeLogin('')
            changePassword('')
            changePassword2('')
        }
        else{
            changeError('Incorrect form filling')
        }
        console.log(users)

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
                <input onChange={event => changeLogin(event.target.value)}     value ={login}     type="text"      placeholder="Login" />
                <input onChange={event => changePassword(event.target.value)}  value ={password}  type="password"  placeholder="Password" />
                <input onChange={event => changePassword2(event.target.value)} value ={password2} type="password"  placeholder="Reset password" />
            </div> 
            <p id="errortext">{error}</p>
            {/* <button type="submit" id="but" onClick={event => console.log( event.target.id)}>Create</button> */}
            <button onClick={submitUser} type="submit" id="but" >Create</button>
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