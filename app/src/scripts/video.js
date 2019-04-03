var moderator_session = {
    audio : true,
    video : true
}

class VideoConnector {

    constructor(connection_url, handlers) {
        this.connector = new window.RTCMultiConnection()
        this.connector.socketURL = connection_url
        this.connector.session = {
            audio : true,
            video :true
        }

        this.handlers = handlers
    }

    createStream(room_id) {
        this.connector.openOrJoin(room_id)    
        
        this.connector.onstream = (event) => {
            this.handlers['room_video_render'](event)
        }
    }

}

export default VideoConnector;