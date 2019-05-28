import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import Notecard from './Notecard';
import PropTypes from 'prop-types';

class PageNote extends Component{
    state = {
        folder: [], 
        note: {},
        error: null
      }
      componentDidMount(){
        const url = `http://localhost:9000/api/notes/${this.props.match.params.noteId}`
            const options = {
              method: "GET", 
              headers: {
                'Authorization': 'Bearer 1234', 
                'Content-Type': 'application/json'
              }
            }
            fetch(url, options)
            .then(res => {
              if(!res.ok){
                throw new Error(res.status)
              }
              return res
            })
            .then(res => res.json())
            .then(note => this.setState({note}))
            .then(() => this.fetchFolder())
            .catch(error => this.setState({error}))
          }

          fetchFolder(){
              const {folder_id} = this.state.note
              const url = `http://localhost:9000/api/folders/${folder_id}`
              const options = {
                method: "GET", 
                headers: {
                  'Authorization': 'Bearer 1234', 
                  'Content-Type': 'application/json'
                }
              }
              fetch(url, options)
              .then(res => {
                  if(!res.ok){
                      throw new Error(res.status)
                  }
                  return res
              })
              .then(res => res.json())
              .then(folder => this.setState({folder}))
              .catch(error => this.setState({error}))
          }

    
    render(){
        return (
            <div  className='main'>
                <div>
                    <h1>{this.state.folder.name}</h1>
                </div>
                <section>
                <Notecard note={this.state.note} deleteNote={this.props.deleteNote}/>
                <p className='notecard-content'>{this.state.note.content}</p>       
                </section>
            </div>
        )
    }
}

PageNote.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.id, 
        name: PropTypes.name               
    })), 
    notes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string, 
        folder_id: PropTypes.number, 
        name: PropTypes.string, 
    })), 
    match: PropTypes.shape({
        params: PropTypes.shape({
            noteId: PropTypes.string
        })
    })
}

export default PageNote
