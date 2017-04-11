import React from 'react'
import { connect } from 'react-redux'
import Channel from './Channel'


export default class Channels extends React.Component {
    constructor(){
        super()
    }
    render(){
        const { channels } = this.props
        // console.log('***')
        // console.log(channels)
        return (
            <div>
                <h2> CHANNEL </h2>
                <div>
                    <Channel key='all' name='ALL' id='all'/>
                    {
                        channels.map((channel) => {
                            return <Channel key={channel['id']} name={channel['name']} id={channel['id']}/>
                        })
                    }
                </div>
            </div>
        )
    }
}
