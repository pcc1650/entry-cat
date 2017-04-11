import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

@connect(state=>({
    userInfo: state.loginRequest.userInfo
}))
 class App extends React.Component{
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
        browserHistory.push('/login')
    }
    render(){
        console.log(this.props.location.pathname)
        if (this.props.location.pathname == '/login' )
            return this.props.children

        return  this.props.userInfo == null ? null : (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default App

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
