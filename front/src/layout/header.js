import React from 'react'
import {Link} from "react-router-dom"
 
export default function Header(args){
    return(
        <div className="header">
            <div><p className='logo'>LogoName</p></div>
            <div>
                {args.headers.map(headers => {
                    return ( <Link key={headers.id} to={headers.link}>{headers.title}</Link> )
                })}
            </div>
        </div>
    )
}