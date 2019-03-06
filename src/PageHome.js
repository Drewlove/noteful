import React, {Component} from 'react'; 
import Notecard from './Notecard';
import FolderList from './FolderList';
import NotefulContext from './NotefulContext'

class PageHome extends Component{

    static contextType = NotefulContext; 

    render(){
        const notes = this.context.notes.map((note, index) =>{
            return (
                <Notecard note={note} key={index}/>
            )
        })    
        return (
            <>
                <FolderList/>
                <section>
                {notes}
                </section>
                
            </>
        )
    }
}

export default PageHome