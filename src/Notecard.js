import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Notecard extends Component{
    render(){
        return (
                <Link to={`/note/${this.props.note.id}`} className='notecard-container' >
                <h1>{this.props.note.name}</h1>
                <button className='notecard-btn'>Delete</button>
                </Link>
                
        )
    }
}

export default Notecard