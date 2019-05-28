import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import PageHome from './PageHome';
import PageFolder from './PageFolder';
import PageNote from './PageNote';
import AddFolder from './AddFolder'; 
import AddNote from './AddNote'; 
import EditNoteCard from './EditNoteCard'

class App extends Component {
  state = {
    notes: [], 
    folders: [], 
    note: {},
    error: null
  }

  componentDidMount(){
    const options = {
      method: "GET", 
      headers: {
        'Authorization': 'Bearer 1234', 
        'Content-Type': 'application/json'
      }
    }
    this.updateFetchedState('http://localhost:9000/api/folders', 'folders', options)
    this.updateFetchedState('http://localhost:9000/api/notes', 'notes', options)
  }

  updateFetchedState(url, stateName, options){
    fetch(url, options)
    .then(res => {
      if(!res.ok){
        throw new Error(res.status) 
      }
      return res
    })
    .then(res => res.json())
    .then(resJSON => this.setState({[stateName]: resJSON}))
    .catch(error => this.setState({error}))
  }

  addFolder = (folder)=> {
    const folders = [...this.state.folders, folder]; 
    this.setState({folders})
  }

  addNote = (note)=> {
    const notes = [...this.state.notes, note]; 
    this.setState({notes})
  }

  editNote = (editedNote) => {
    const filteredNotes = this.state.notes.filter(note => note.id !== editedNote.id)
    const notes = [...filteredNotes, editedNote]
    this.setState({notes})
  }

  deleteNote = (noteId) => {
    const notes = this.state.notes.filter(note => {
      return note.id !== noteId
    })
    this.setState({notes})
  }

  render() {
    return (
        <div className="App">
          <header>
            <Link className='header-text' to='/'> Noteful</Link>
            <Link to='/addFolder' className='add-btn'>Add Folder</Link>
            <Link to='/addNote' className='add-btn'>Add Note</Link>
          </header>
          <main>
            <Route 
            exact path='/'
            render={()=> {
              return (
              <PageHome 
                notes={this.state.notes}
                folders={this.state.folders}
                selectNote={this.selectNote}
                deleteNote={this.deleteNote}
              />
              )
            }}
            />
            
            <Route
              path='/folder/:folder_id'
              render={(routeProps) => {
                return(
                  <PageFolder 
                  folders={this.state.folders}
                  notes={this.state.notes}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                  {...routeProps}
                  />
                )
              }}
              />
              
              <Route 
              path = '/note/:noteId'
              render={routeProps => {
                return (
                  <PageNote 
                  notes = {this.state.notes}
                  folders={this.state.folders}
                  deleteNote={this.deleteNote}
                 {...routeProps}
                  />
                )
              }}
              />
              
              <Route 
              path = '/edit/:noteId'
              render={routeProps => {
                return (
                  <EditNoteCard
                  notes={this.state.notes}
                  folders={this.state.folders}
                  editNote={this.editNote}
                 {...routeProps}
                  />
                )
              }}
              />

              <Route path='/addFolder'
              render={(routeProps)=> {
               return <AddFolder 
               addFolder={this.addFolder}
               {...routeProps}
               />
              }}
              />  

              <Route path='/addNote'
              render={(routeProps) => {
                return <AddNote 
                folders={this.state.folders}
                addNote={this.addNote}
                {...routeProps}
                />
              }}
              
              />
        </main> 
      </div>
    );
  }
}

export default App;



