import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'
import PageHome from './PageHome'
import PageFolder from './PageFolder'
import PageNote from './PageNote'
import NotefulContext from './NotefulContext';

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
    const contextValue = {
      folders: this.state.folders, 
      notes: this.state.notes, 
      note: this.state.note, 
      selectNote: this.selectNote, 
      deleteNote: this.deleteNote
    }

    return (
        <div className="App">
          <header>
            <Link className='header-text'to='/'>Noteful</Link>
          </header>
          <main className='main'>
          <NotefulContext.Provider value={contextValue}>
            <Route 
            exact path='/'
            component={PageHome}
            />

            <Route
            path='/folder/:folderId'
            component={PageFolder}
            /> 
            
            <Route 
              path = '/note/:noteId'
              component={PageNote}
              /> 
            </NotefulContext.Provider>
        </main> 
      </div>
    );
  }
}

export default App;