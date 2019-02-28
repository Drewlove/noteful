import React, { Component } from 'react';
import store from './store'
import {Route} from 'react-router-dom'
import PageHome from './PageHome'
import PageFolder from './PageFolder'
import PageNote from './PageNote'

class App extends Component {
  state = {
    store, 
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Noteful</h1>
        </header>
        <main className='main'>
          <Route 
          exact path='/'
          component={PageHome}
          />
          <Route
          path='/folder/:folderId'
          render={props=> 
            <PageFolder 
            {...props}
            />
          }
          />     
          <Route 
            path = '/note/:noteId'
            render={props => 
              <PageNote {...props}/>
            }
            />
        </main>
      </div>
    );
  }
}

export default App;
