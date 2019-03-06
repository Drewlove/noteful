import React, {Component} from 'react';
import FolderList from './FolderList';  
import Notecard from './Notecard'; 
import NotefulContext from './NotefulContext'; 


class PageFolder extends Component{

    static contextType = NotefulContext; 

    render(){
        console.log(this.context)
        const notes = this.context.notes.filter(note => {
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