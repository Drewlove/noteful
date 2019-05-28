import React, {Component} from 'react'

class EditNotecard extends Component{
    state = {
        content: '', 
        id: null, 
        folder_id: null, 
        name: ''
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
            .then(note => this.setState({...note}))
            .then(() => this.fetchFolder())
            .catch(error => this.setState({error}))
        }
        
        updateName(name){
            this.setState({name})
        }
    
        updateFolder(folder_id){
            console.log(`update folder ${folder_id}`)
            this.setState({folder_id})
        }
    
        updateContent(content){
            this.setState({content})
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
            const url = `http://localhost:9000/api/notes/${this.state.id}`
            const options = {
                method: 'PATCH', 
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
            .then( () => {
                const note = {
                    content: this.state.content,  
                    folder_id: this.state.folder_id, 
                    name: this.state.name, 
                    id: this.state.id
                }
                this.props.editNote(note)
                this.props.history.push('/')
            })
            .catch(error => this.setState({error}))
    }

        renderForm(){
            return(
            <form onSubmit={(e)=> this.handleValidate(e)}>
            <label htmlFor='name'>Name</label>
            <input type='text' 
            name='name' 
            value={this.state.name}
            placeholder={this.state.name} 
            onChange={(e)=>this.updateName(e.target.value)}/>
            <label htmlFor='folder'>Folder</label>
            <select value={this.state.folder_id} onChange={(e)=>this.updateFolder(parseInt(e.target.value))}>
            {this.renderOptions()}
            </select>
            <label htmlFor='content'>Content</label>
            <textarea name='content' placeholder={this.state.content} onChange={(e)=>this.updateContent(e.target.value)}/>
            <button>Submit</button>
            </form>
            )
        }

        renderOptions(){
            return this.props.folders.map(folder => {
                return <option key={folder.id} value={folder.id}>{folder.name}</option>     
            })
        }

    render(){
        return (
            <>
            {this.state.id !== null && this.props.folders.length > 0 ? this.renderForm() : null}
            </>
        )
    }
}

export default EditNotecard