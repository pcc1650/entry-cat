import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'


export default class Comments extends React.Component {
    constructor(){
        super()
    }
    render(){
        const { comments } = this.props
        // console.log('***')
        // console.log(channels)
        return (
            <div>
                <p> Comments </p>
                <div>
                {
                    comments.map((comment) => {
                        return <Comment key={comment.id} username={comment.author.username} comment={comment.comment}
                        avatar={comment.author.avatar}
                        time={comment.create_time} />
                    })
                }
                </div>
            </div>
        )
    }
}
