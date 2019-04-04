import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import VideoStreamer from './video';

var IP = require('../config.json').server

var randomstring = require('randomstring') 

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            name : '',
            password : ''
        }
    }

    registerRoom(patient_id) {
        var room_id = randomstring.generate({
            charset : 'hex',
            length : 12
        })

        console.log("Sending request to " + IP)

        console.log("Generating room id : " + room_id)

        fetch(IP+"/register_room", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, method : 'post', mode : 'cors',
            body : JSON.stringify({
                room_id : room_id,
                patient_id : patient_id
            })
        }).then((resp) => resp.json()).then((data) => ReactDOM.render(
            <VideoStreamer room_id = {room_id} />,
            document.getElementById('root')
        )).catch((err) => console.log(err))
    }

    auth() {
        fetch(IP + "/auth", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', 
            body : JSON.stringify({user : this.state})
        }).then((data) => data.json()).then((data) => {
            console.log(data)
            if(!data.success) alert("User auth failed")
            else ReactDOM.render(<VideoStreamer room_id  = {data.message}/>, document.getElementById('root'))
        }).catch((err) => console.log(err))
    }

    render(){
        return (
            <div>
            <div className = "card" style = {{margin : '30px auto', padding : '40px'}}>
               <h5 className = "title">Go online ..</h5>
               <button className = "button is-info is-rounded" onClick = {() => {
                   this.registerRoom(32)
               }}>23</button>
               <button className = "button is-info is-rounded" onClick = {() => {
                   this.registerRoom(34)
               }}>25</button>

            </div>
             <div className = "card" style = {{margin : '30px auto', padding : '40px'}}>
             <h5 className = "title">Join : </h5>
             <div style = {{margin : '20px auto'}}>
                <p>User Name : </p>
                <input className = "input is-info is-rounded" value = {this.state.name} onChange = {(e) => {
                    this.setState({name : e.target.value})
                }}/>
             </div>

             <div style = {{margin : '20px auto'}}>
                <p>Password : </p>
                <input className = "input is-info is-rounded" value = {this.state.password} onChange = {(e) => {
                    this.setState({password : e.target.value})
                }}/>
             </div>

             <button onClick = {() => {
                 this.auth()
             }} className = "button is-info">Join</button>
    
          </div>
          </div>
        )
    }

}



export default HomePage