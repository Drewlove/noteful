import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import Notecard from './Notecard';
import NotefulContext from './NotefulContext';

class PageNote extends Component{

    static contextType = NotefulContext; 

    render(){
        const note = this.context.notes.find(note => {
            return note.id === this.props.match.params.noteId
        })
        const folder = this.context.folders.find(folder => {
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
