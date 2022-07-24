import React from "react";


export default function Page404(args){
    React.useEffect(() => {
        document.title = '404'
    });
    return(
        <>
        <div className="registrationDiv">
            <p>404</p>
            <span>Page not fount</span>
        </div>  
        </>
    )
}