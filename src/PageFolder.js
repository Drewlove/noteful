import React, {Component} from 'react';
import FolderList from './FolderList';  
import Notecard from './Notecard'; 
import STORE from './store'; 

class PageFolder extends Component{
    render(){
        const notes = STORE.notes.filter(note => {
            return note.folderId === this.props.match.params.folderId
        })
        return(
            <>
                <FolderList />
                <section>
                {notes.map((note, index) => {
                    return <Notecard note={note} key={index}/>
                })}
                </section>
            </>
        )
    }
}

export default PageFolder