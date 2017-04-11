import React from 'react'
import { connect } from 'react-redux'
import { selectingChannel, removingChannel } from '../actions'

class Channel extends React.Component {
    constructor(){
        super()
        this.state = {
            actived: false,
        }
    }
    handleClick(e){
        e.preventDefault()
        const { id, dispatch } = this.props
        !this.state.actived ? dispatch(selectingChannel(id)) : dispatch(removingChannel(id))
        this.setState({actived: !this.state.actived})
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

const mapStateToProps = state => {
    const { dispatch } = state
    return { dispatch }
}


export default connect(mapStateToProps)(Channel)
