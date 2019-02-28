import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import Notecard from './Notecard';
import STORE from './store';

class PageNote extends Component{
    render(){
        const note = STORE.notes.find(note => {
            return note.id === this.props.match.params.noteId
        })
        const folder = STORE.folders.find(folder => {
            return folder.id === note.folderId
        })
        return (
            <>
                <div>
                    <Link to='/' className='sidebar-btn'>
                    Go Back
                    </Link>
                    <h1>{folder.name}</h1>
                </div>
                <section>
                <Notecard note={note}/>
                <p className='notecard-content'>{note.content}</p>
                </section>
            </>
        )
    }
}

export default PageNote
