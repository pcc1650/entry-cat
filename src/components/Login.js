import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../actions'
import '../sass/login.scss'

class LoginForm extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <div className='login-input-container'>
                    <input  type='text' placeholder='Username' className='login-input' value={this.props.username} onChange={(e) => this.props.handleUsernameChange(e.target.value)}/>
                </div>
                <div className='login-input-container'>
                    <input type='password' placeholder='Password' className='login-input' value={this.props.password} onChange={(e) => this.props.handlePasswordChange(e.target.value)}/>
                </div>
            </div>
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
            browserHistory.push('/')
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
                <div className='login-container'>
                    <div className='login-mask-1'>
                        <p className='login-description'> FIND THE MOST LOVED ACTIVITIES </p>
                        <p className='login-title'> BLACK CAT </p>
                        <div className='login-outer-circle'>
                            <div className='login-inner-circle'>
                                <div className='login-logo-container'>
                                    <img src='../SVGs/logo-cat-login.svg'/>
                                </div>
                            </div>
                        </div>
                        <div hidden={isLogining || loginFailed} className='login-notification-subsitute'></div>
                        {isLogining &&
                            <div className='login-notification'> Logining </div>
                        }
                        {loginFailed && !isLogining &&
                            <div className='login-notification'>Username or password wrong!</div>
                        }
                        <div  className='login-form'>
                            <LoginForm username={this.state.username} password={this.state.password} handleUsernameChange={(e) => this.handleUsernameChange(e)} handlePasswordChange={(e) => this.handlePasswordChange(e)}/>
                        </div>
                    </div>
                    <div className='login-pic' />
                    <div className='login-mask-2' />
                    <div className='login-signIn' onClick={(e) => this.handleLogin(e)} > SIGN IN </div>
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
