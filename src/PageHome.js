import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import Notecard from './Notecard';
import FolderList from './FolderList';
import STORE from './store';

class PageHome extends Component{
    render(){
        const notes = STORE.notes.map((note, index) =>{
            return (
                <Notecard note={note} key={index}/>
            )
        })    
        return (
            <>
                <FolderList />
                <section>
                {notes}
                </section>
                
            </>
        )
    }
}

export default PageHome