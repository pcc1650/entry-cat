import React from 'react'
import { connect } from 'react-redux'
import Channels from './Channels'


export default class SearchBar extends React.Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>
            <Channels channels={this.props.channels}/>
            <button> Search </button>
            </div>
        )
    }
}
