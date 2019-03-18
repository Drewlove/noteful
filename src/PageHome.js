import React, {Component} from 'react'; 
import Notecard from './Notecard';
import FolderList from './FolderList';
import PropTypes from 'prop-types';

class PageHome extends Component{

    render(){
        const notes = this.props.notes.map((note, index) =>{
            return (
                <Notecard 
                note={note} 
                key={index} 
                selectNote={this.props.selectNote}
                deleteNote={this.props.deleteNote}/>
            )
        })    
        return (
            <div className='main'>
                <FolderList folders={this.props.folders}/>
                <section>
                {notes}
                </section>
            </div>
        )
    }
}

PageHome.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, 
        folderId: PropTypes.string, 
        content: PropTypes.string, 
        name: PropTypes.string     
    })), 
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, 
        name: PropTypes.string 
    }))
}

export default PageHome