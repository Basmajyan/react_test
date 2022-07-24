import React from "react"
import axios from "axios";

export default class CreateTodo extends React.Component{
    

    CreateTodoFunc = (user,title,description,category) => {
        let csrf = ""
        let token = ""
        if (document.cookie){
            csrf = document.cookie.split('; ')
            for(let i in csrf){
                if(csrf[i].includes('csrftoken')){
                    token = csrf[i].replace("csrftoken=",'')
                    break
                }
            }
        }
        if (user){
            if (title){
                if (description){
                    if (category){
                            const requestOptions = {
                                method:'POST',
                                
                                headers:{
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-CSRFToken': token,
                                },
                                body:JSON.stringify({
                                    user:user,
                                    title:title,
                                    description:description,
                                    category:category,
                                })
                            }
                            fetch('/api/',requestOptions)
                            .then((response) => response.json())
                            .then((data) => console.log(data))
                            document.getElementById('user').value = ''
                            document.getElementById('title').value = ''
                            document.getElementById('description').value = ''
                            document.getElementById('category').value = ''
                            document.getElementById('errortext').innerHTML = ''
                            window.location.reload()
                    }else{
                        this.setState({error:'Category is not defined'})
                    }
                }else{
                    this.setState({error:'Description is not defined'})
                }
            }else{
                this.setState({error:'Title is not defined'})
            }        
        }else{
            this.setState({error:'User is not defined'})
        }

    }
    
    state = {
        user:'',
        title:'',
        description:'',
        category:'',
        error:'',
        todos:'',
    }        
    componentDidMount(){
        axios.get('/api/todo_list')
        .then(request => this.setState({todos:request.data}))        
    }
    render(){
            document.title = 'Create todo'
    return(
        <>
        <div className="registrationDiv">
            <p>Create Todo</p>
            <span>Remember everything</span>
            <form className="forms">
                
                <input onChange={event => this.setState({user:event.target.value})}         value ={this.state.user}         type="text"  placeholder="User"        id="user"/>
                <input onChange={event => this.setState({title:event.target.value})}        value ={this.state.title}        type="text"  placeholder="Title"       id="title"/>
                <input onChange={event => this.setState({description:event.target.value})}  value ={this.state.description}  type="text"  placeholder="Description" id="description"/>
                <input onChange={event => this.setState({category:event.target.value})}     value ={this.state.category}     type="text"  placeholder="Category"    id="category"/>
            </form> 
            <p id="errortext">{this.state.error}</p>
            {/* <button type="submit" id="but" onClick={event => console.log( event.target.id)}>Create</button> */}
            <button onClick={() => this.CreateTodoFunc(this.state.user,this.state.title,this.state.description,this.state.category)} type="submit" id="but" >Sign in</button>
        </div>   
        <br />
        <br />
        <br />
        <br />
        <div className="registrationDiv">
            <p>Todo List</p>
            {
                
                this.state.todos ? this.state.todos.map(x => {return(
                    <>
                        <span>{x.id}</span>
                        <span>{x.user}</span>
                        <span>{x.title}</span>
                        <span>{x.description}</span>
                        <span>{x.date}</span>
                        <hr />
                    </>
                )}): <p>no todos</p>
            }
        </div>          
        </>
    )
}}