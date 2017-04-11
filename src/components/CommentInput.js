import React from 'react'

export default class CommentInput extends React.Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <input onChange={(e) => this.props.handleCommentChange(e.target.value)} value={this.props.value} type='text' placeholder='Leave your comment here'/>
            </div>
        )
    }
}
