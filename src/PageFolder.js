import React, {Component} from 'react';
import FolderList from './FolderList';  
import Notecard from './Notecard'; 
import PropTypes from 'prop-types'


class PageFolder extends Component{

    render(){
        const notes = this.props.notes.filter(note => {
            return note.folderId === this.props.match.params.folderId
        })
        return(
            <div  className='main'>
                <FolderList folders={this.props.folders}/>
                <section>
                {notes.map((note, index) => {
                    return <Notecard 
                    note={note} 
                    key={index} 
                    selectNote={this.props.selectNote}
                    deleteNote={this.props.deleteNote}
                    />
                })}
                </section>
            </div>
        )
    }
}

PageFolder.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string, 
        folderId: PropTypes.string, 
        id: PropTypes.string,
        name: PropTypes.string
    })), 
    match: PropTypes.shape({
        params: PropTypes.shape({
            folderId: PropTypes.string
        })
    })
}

export default PageFolder