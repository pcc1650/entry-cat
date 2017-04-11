import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default class PostThumbnail extends React.Component {
    constructor(){
        super()
    }
    render(){
        const { username, channel, title, startDate, endDate, description, id, onClick } = this.props
        const standardStartDate = new Date(startDate*1000)
        const standardEndDate = new Date(endDate*1000)
        return (
            <div onClick={onClick}>
                <div style={PostThumbnailStyle}>
                <p>{ username} </p>
                <p>{ channel }</p>
                <p>{ title }</p>
                <p>{ standardStartDate.toLocaleDateString() + ' ' + standardStartDate.toLocaleTimeString()}</p>
                <p>{ standardEndDate.toLocaleDateString() + ' ' + standardEndDate.toLocaleTimeString() }</p>
                <p>{ description }</p>
                <p>going</p>
                <p>like</p>
                </div>
                <div style={ downBorder }>
                </div>
            </div>
        )
    }
}

const PostThumbnailStyle = {
    height: "500px",
    width: "1000px",
    border: "1px solid black",
    padding: "2px",
}

export const downBorder = {
    width: "1020px",
    backgroundColor: "#006600",
    height: "5px",
}
