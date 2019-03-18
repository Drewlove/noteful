import React, {Component} from 'react'; 
import FormError from './FormError'; 

class AddNote extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '', 
            folderId: '', 
            content: '', 
            errorMessage: ''
        }
    }

    handleValidate(e){
        e.preventDefault()
        if(this.state.name.length === 0){
            const errorMessage = "Must enter a name for the note"
            this.setState({errorMessage})
        } else if(this.state.folderId === ''){
            const errorMessage = "Must select a folder"; 
            this.setState({errorMessage})
        } else {
            this.submit(); 
        }
    }

    submit(){
        const {name, folderId, content} = this.state;
        const options = {
            method: 'POST', 
            body: JSON.stringify({name, folderId, content}), 
            headers: {
                'content-type': 'application/json'
            }
        }; 

        fetch('http://localhost:9090/notes', options)
        .then(res => {
            if(!res.ok){
                throw new Error('no good man! no good!')
            }
            return res.json()
        })
        .then(this.props.addNote)
        .then(this.props.history.push('/'))
    }

    updateName(name){
        this.setState({name})
    }

    updateFolder(folderId){
        this.setState({folderId})
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
        id: PropTypes.string.isRequired, 
        name: PropTypes.string.isRequired
    })), 
    addNote: PropTypes.func
}

    export default AddNote