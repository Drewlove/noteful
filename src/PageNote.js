import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import Notecard from './Notecard';
import PropTypes from 'prop-types';

class PageNote extends Component{

    render(){
        console.log('props', this.props)
        const note = this.props.notes.find(note => {
            return note.id === this.props.match.params.noteId
        })
        const folder = this.props.folders.find(folder => {
            return folder.id === note.folderId
        })

        return (
            <div  className='main'>
                <div>
                    <Link to='/' className='sidebar-btn'>
                    Go Back
                    </Link>
                    <h1>{folder.name}</h1>
                </div>
                <section>
                <Notecard note={note} deleteNote={this.props.deleteNote}/>
                <p className='notecard-content'>{note.content}</p>
                
                </section>
            </div>
        )
    }
}

PageNote.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.name, 
        name: PropTypes.id                
    })), 
    notes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string, 
        folderId: PropTypes.string, 
        name: PropTypes.string, 
    }))
}

export default PageNote
