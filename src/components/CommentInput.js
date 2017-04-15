import React from 'react'

export default class CommentInput extends React.Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <input style={inputStyle} onChange={(e) => this.props.handleCommentChange(e.target.value)} value={this.props.value} type='text' placeholder='Leave your comment here'/>
            </div>
        )
    }
}

const inputStyle = {
    "width": "63vw",
    "height": "5vh",
    borderRadius: "50px",
    fontSize: "2.5vh",
    paddingLeft: "20px",
}
