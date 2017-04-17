import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

@connect(state=>({
    userInfo: state.loginRequest.userInfo,
    userToken: state.loginRequest.userToken
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
        this.props.userInfo == null && browserHistory.push('/login')
    }
    render(){
        // console.log(this.props.location.pathname)
        if (this.props.location.pathname == '/login' )
            return this.props.children

        // console.log(localStorage.getItem('userToken'))
        // console.log(JSON.parse(localStorage.getItem('userInfo')))

        // console.log(this.props)

        return  this.props.userInfo == null ? null : (
            <div>
                {this.props.children}
            </div>
        )
        // return  localStorage.Token == null ? null : (
        //     <div>
        //         {this.props.children}
        //     </div>
        // )
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
