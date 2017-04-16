import React from 'react'
import { connect } from 'react-redux'
import { selectingChannel, removingChannel } from '../actions'
import '../sass/searchBar.scss'


class Channel extends React.Component {
    constructor(){
        super()
        this.state = {
            actived: false,
        }
    }
    handleClick(e){
        const { id, dispatch } = this.props
        !this.state.actived ? dispatch(selectingChannel(id)) : dispatch(removingChannel(id))
        this.setState({actived: !this.state.actived})
    }
    render(){
        const { name, id } = this.props
        return (
            <div>
                <div className={this.state.actived?'searchBar-channel-block-activated': 'searchBar-channel-block'} onClick={(e) => this.handleClick(e)}>{ name }</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { dispatch } = state
    return { dispatch }
}


export default connect(mapStateToProps)(Channel)
