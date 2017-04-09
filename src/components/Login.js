import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../actions'


class LoginForm extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <form id='loginForm'>
                <p>
                    <input type='text' placeholder='Username' value={this.props.username} onChange={(e) => this.props.handleUsernameChange(e.target.value)}/>
                </p>
                <p>
                    <input type='password' placeholder='Password' value={this.props.password} onChange={(e) => this.props.handlePasswordChange(e.target.value)}/>
                </p>
            </form>
        )
    }
}

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
        }
    }
    componentWillMount(){
        console.log('Login')
    }

    componentWillReceiveProps(nextProps) {
        const { isLogined } = nextProps
        if(isLogined){
            browserHistory.push('/index')
        }
    }
    handleLogin(e){
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(login(this.state))
    }
    handleUsernameChange(username){
        this.setState({
            username: username,
        })
    }
    handlePasswordChange(password){
        this.setState({
            password: password,
        })
    }
    render(){
        const { isLogining, loginFailed } = this.props
        return (
            <div>
                <LoginForm username={this.state.username} password={this.state.password} handleUsernameChange={(e) => this.handleUsernameChange(e)} handlePasswordChange={(e) => this.handlePasswordChange(e)}/>
                <button onClick={(e) => this.handleLogin(e)} > Sign in </button>
                {isLogining &&
                    <h1> Logining </h1>
                }
                {loginFailed &&
                    <h2>Username or password wrong!</h2>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { loginRequest } = state
    const {
        isLogining,
        userInfo,
        userToken,
        isLogined,
        loginFailed,
    } = loginRequest

    return {
        isLogining,
        userInfo,
        userToken,
        isLogined,
        loginFailed
    }
}


export default connect(mapStateToProps)(Login)
