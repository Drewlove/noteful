import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import PageHome from './PageHome';
import PageFolder from './PageFolder';
import PageNote from './PageNote';
import AddFolder from './AddFolder'; 
import AddNote from './AddNote'; 

class App extends Component {
  state = {
    notes: [], 
    folders: [], 
    note: {},
    error: null
  }

  componentDidMount(){
    this.updateFetchedState('http://localhost:9090/notes', 'notes')
    this.updateFetchedState('http://localhost:9090/folders', 'folders')
  }

  updateFetchedState(url, stateName){
    fetch(url)
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

  selectNote = (note) => {
    this.setState({note})
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
              path='/folder/:folderId'
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



