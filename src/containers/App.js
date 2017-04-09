import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'


export default class App extends React.Component{
    componentWillMount(){
        console.log('App')
    }
    componentDidMount(){
        // const { isLogined } = this.props
        // if(isLogined){
        //     browserHistory.push('index')
        // }
        // else{
        //     browserHistory.push('login')
        // }
        browserHistory.push('login')
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}


// const mapStateToProps = state => {
//     const { loginRequest } = state
//     const {
//         isLogined,
//     } = loginRequest
//
//     return {
//         isLogined,
//     }
// }
//
//
// export default connect(mapStateToProps)(App)
