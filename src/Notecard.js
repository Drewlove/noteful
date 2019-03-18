import React, {Component} from 'react'
import {Link} from 'react-router-dom' 
import PropTypes from 'prop-types'; 

class Notecard extends Component{

    handleSelectNote = (note) => {
        this.props.selectNote(note)
    }

    handleDeleteNote = (noteId, callbackDelete) => {
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE', 
            headers: {
                'content-type': 'application/json'
              },
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(callbackDelete(noteId))
        .catch(error => console.log(error))
    }

    render(){
        return (
            <div className='notecard'>
                <Link 
                to={`/note/${this.props.note.id}`} 
                className='notecard-title'
                onClick={()=> this.handleSelectNote(this.props.note)}
                >
                <h1>{this.props.note.name}</h1>
                </Link>
                <button className='notecard-delete-btn' 
                onClick={()=>this.handleDeleteNote(this.props.note.id, this.props.deleteNote)}
                >
                Delete
                </button>
            </div>
        )
    }
}

Notecard.propTypes = {
    selectNote: PropTypes.func, 
    note: PropTypes.object
}


export default Notecard