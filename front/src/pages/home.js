import React from "react";


export default function Home(args){
    React.useEffect(() => {
        document.title = 'Home';
    });
    return(
        <>
        <div className="registrationDiv">
            <p>Home</p>
            <span>Website</span>            
        </div>  
        </>
    )
}