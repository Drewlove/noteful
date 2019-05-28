import React, {Component} from 'react';
import FolderList from './FolderList';  
import Notecard from './Notecard'; 
import PropTypes from 'prop-types'


class PageFolder extends Component{
    state = {
        folderId: null, 
        filteredNotes: null,  
        error: null
    }

    componentDidMount(){
        console.log(this.props.notes)
        this.updateFolderId()
    }

    updateFolderId(){
        const folderId = parseInt(this.props.match.params.folder_id)
        this.setState({folderId})
    }

    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){
            this.updateFolderId()
        } else {
            this.renderFilteredNotes()
        }
    }

    renderFilteredNotes(){
        const notes = this.props.notes.filter(note => {
            return note.folder_id === this.state.folderId
        })
        return notes.map(note => {
            console.log(note.id)
            return <Notecard 
            note={note}
            key={note.id}
            deleteNote={this.props.deleteNote}
            />
        })
    }

    render(){
        return(
            <div  className='main'>
                <FolderList folders={this.props.folders}/>
                <section>
                {this.props.notes.length > 0? 
                this.renderFilteredNotes()
                : null
            } 
                </section>
            </div>
        )
    }
}

PageFolder.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string, 
        folder_id: PropTypes.number, 
        id: PropTypes.number,
        name: PropTypes.string
    })), 
    match: PropTypes.shape({
        params: PropTypes.shape({
            folder_id: PropTypes.string
        })
    })
}

export default PageFolder