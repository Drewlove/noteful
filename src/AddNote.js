import React, {Component} from 'react'; 
import FormError from './FormError'; 
import PropTypes from 'prop-types';
import config from './config'

class AddNote extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '', 
            folder_id: '', 
            content: '', 
            errorMessage: '', 
            folders: []
        }
    }

    handleValidate(e){
        e.preventDefault()
        if(this.state.name.length === 0){
            const errorMessage = "Must enter a name for the note"
            this.setState({errorMessage})
        } else if(this.state.folder_id === ''){
            const errorMessage = "Must select a folder"; 
            this.setState({errorMessage})
        } else {
            this.submit(); 
        }
    }

    submit(){
        const url = `${config.API_ENDPOINT}/api/notes`
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                name: this.state.name, 
                folder_id: this.state.folder_id, 
                content: this.state.content 
            }),
            headers: {
                'Authorization': 'Bearer 1234', 
                'content-type': 'application/json'
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
        .then(resJSON => this.props.addNote(resJSON))
        .then(this.props.history.push('/'))
    }

    componentDidMount(){
        const options = {
          method: "GET", 
          headers: {
            'Authorization': 'Bearer 1234', 
            'Content-Type': 'application/json'
          }
        }
        this.updateFetchedState(`${config.API_ENDPOINT}/api/folders`, options)
      }
    
      updateFetchedState(url, options){
        fetch(url, options)
        .then(res => {
          if(!res.ok){
            throw new Error(res.status) 
          }
          return res
        })
        .then(res => res.json())
        .then(folders => this.setState({folders}))
        .then( () => this.setDefaultFolder()) 
        .catch(error => this.setState({error}))
      }

      setDefaultFolder(){
        const folder_id = this.state.folders[0].id
        this.setState({folder_id})
      }



    updateName(name){
        this.setState({name})
    }

    updateFolder(folder_id){
        this.setState({folder_id})
    }

    updateContent(content){
        this.setState({content})
    }


    render(){
        const renderFolders = this.props.folders.map(folder => {
                return <option key={folder.id} value={folder.id}>{folder.name}</option>
            })

        return (
            <>
            <form onSubmit={(e)=> this.handleValidate(e)}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' onChange={(e)=>this.updateName(e.target.value)}/>
            <label htmlFor='folder'>Folder</label>
            <select onChange={(e)=>this.updateFolder(e.target.value)}>
                {renderFolders}
            </select>
            <label htmlFor='content'>Content</label>
            <textarea name='content' onChange={(e)=>this.updateContent(e.target.value)}/>
            <button>Submit</button>
            </form>
            <FormError errorMessage={this.state.errorMessage}/>
            </>
        )
    }
}

AddNote.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired, 
        name: PropTypes.string.isRequired
    })), 
    addNote: PropTypes.func
}

    export default AddNote