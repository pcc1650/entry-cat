import React from 'react'
import { connect } from 'react-redux'
import Channel from './Channel'
import '../sass/searchBar.scss'

export default class Channels extends React.Component {
    constructor(){
        super()
    }
    render(){
        const { channels } = this.props
        // console.log('***')
        // console.log(channels)
        return (
            <div className='searchBar-channel-block-container'>
                <div className='searchBar-channel-title'> CHANNEL </div>
                <div className='searchBar-channel-underline'></div>
                <div className='searchBar-channels-container'>
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
