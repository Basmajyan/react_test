import React ,{ useEffect } from "react"


// function GetTodos(user,title,description,category) {
    
//     console.log(user);
//     console.log(title);
//     console.log(description);
//     console.log(category);
   
// }



export default function TodoList(){
    const [todos, changeTodos] = React.useState('')
    useEffect(() => {
        fetch('/api/todo_list?format=json')
        .then(response => response.json())
        .then(data => changeTodos(data))
    }, [])
    console.log(todos);
    return(
        <>
        <div className="registrationDiv">
            <p>Todo List</p>
            {
                todos ? todos.map(x => {return(
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
}