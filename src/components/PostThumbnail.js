import React from 'react'
import { connect } from 'react-redux'

export default class PostThumbnail extends React.Component {
    constructor(){
        super()
    }
    render(){
        const { username, channel, title, startDate, endDate, description } = this.props
        const standardStartDate = new Date(startDate*1000)
        const standardEndDate = new Date(endDate*1000)
        return (
            <div>
                <div>
                <p>{ username} </p>
                <p>{ channel }</p>
                <p>{ title }</p>
                <p>{ standardStartDate.toLocaleDateString() + ' ' + standardStartDate.toLocaleTimeString()}</p>
                <p>{ standardEndDate.toLocaleDateString() + ' ' + standardEndDate.toLocaleTimeString() }</p>
                <p>{ description }</p>
                <p>going</p>
                <p>like</p>
                </div>
                <div style={ PostThumbnailStyle }>
                </div>
            </div>
        )
    }
}

const PostThumbnailStyle = {
    backgroundColor: "#EEE",
    height: "10px",
}
