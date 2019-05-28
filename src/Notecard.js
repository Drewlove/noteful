import React, {Component} from 'react'
import {Link} from 'react-router-dom' 
import PropTypes from 'prop-types'; 

class Notecard extends Component{
    state = {
        error: null
    }


    handleDeleteNote(noteId){
        console.log(`note id ${noteId}`)
        const url = `http://localhost:9000/api/notes/${noteId}`
        const options = {
            method: "DELETE", 
            headers: {
                "Authorization": "Bearer 1234", 
                "Content-Type": "application/json"
            }
        }
        fetch(url, options)
        .then(res => {
            if(!res.ok){
                throw new Error(res.status)
            }
            return res
        })
        .then( () => {
            this.props.deleteNote(noteId)
        })
        .catch(error => this.setState({error}))
    }

    renderNotecard(){
        console.log(this.props.note)
        return (
            <section className='notecard'>
            <Link 
                to={`/note/${this.props.note.id}`} 
                className='notecard-title'
                >
                <h1>{this.props.note.name}</h1>
            </Link>
            <button className='notecard-delete-btn' 
                onClick={()=>this.handleDeleteNote(this.props.note.id)}
                >
                Delete
            </button>
            <Link to={`/edit/${this.props.note.id}`}>Edit</Link>
        </section>
        )
    }

    render(){
        return (
            <div>
            {this.props.note ? this.renderNotecard() : null}
            </div>
        )
    }
}

Notecard.propTypes = {
    selectNote: PropTypes.func, 
    note: PropTypes.object
}


export default Notecard