import React from "react"

// function cookieToggle() {
//     console.log('qwsedfgh');
// }

export default class Cookie extends React.Component{
    state = {
        messageClassList: ['cookieDiv']
    }
    render(){
        return(
            <React.Fragment>
                <div className={this.state.messageClassList.join(' ')}>
                    {/* <img onClick={cookieToggle} src="/img/close.svg" alt="" /> */}
                    <img onClick={() => this.setState({messageClassList:['cookieDiv','cookieTrue']})} src="http://localhost:3000/img/close.svg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </React.Fragment>
        )
    }
}