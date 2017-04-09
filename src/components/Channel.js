import React from 'react'
import { connect } from 'react-redux'


export default class Channel extends React.Component {
    constructor(){
        super()
    }
    handleClick(e){
        e.preventDefault()
    }
    render(){
        const { name, id } = this.props
        return (
            <div>
                <button onClick={(e) => this.handleClick(e)}>{ name }</button>
            </div>
        )
    }
}
