import React from 'react'
import ReactDOM from 'react-dom'
import VideoConnector from '../scripts/video'
var IP = require('../config.json').server

class VideoStreamer extends React.Component {
    constructor(props) {
        super(props)

        this.displayRoomID = this.displayRoomID.bind(this)
        this.displayVideo = this.displayVideo.bind(this)

        var connector = new VideoConnector(IP+"/", {
            "room_id_display" : this.displayRoomID,
            "room_video_render" : this.displayVideo
        })

        connector.createStream(this.props.room_id)

        this.state = {streamURL : '', videoElement : null}
    }

    displayRoomID(room_id) {
        console.log(room_id)
        
    }

    displayVideo(event) {
        this.setState({streamURL : event.bolbURL})
        var video = document.getElementById('video_container')
        video.appendChild(event.mediaElement)
    }


    render() {
        return (
           <div className = "card" style = {{margin : '30px auto', padding : '20px'}}>
           <h5 className = "title is-4">Room ID : {this.props.room_id}</h5>
                <div id = "video_container">
                </div>
           </div>
        )
    }
}

export default VideoStreamer