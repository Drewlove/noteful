import React, {Component} from 'react'; 
import FormError from './FormError';
import ErrorBoundary from './ErrorBoundary'; 

class AddFolder extends Component{
    constructor(props){
        super(props)

        this.state={
            name: '', 
            hasError: false, 
            errorMessage: ''
        }
    }

    validateForm(e){
        e.preventDefault(); 
        if(this.state.name.length === 0){
            const errorMessage = "Must enter a folder name"
            this.setState({errorMessage})   
        }
        else(this.handleSubmit())

    }

    handleSubmit(){
        console.log('props', this.props)
        const options = {
            method: 'POST', 
            body: JSON.stringify({name: this.state.name}),
            headers: {
                'content-type': 'application/json'
            }
        }

        fetch('http://localhost:9090/folders', options)
        .then(res => {
            if(!res.ok){
                throw new Error("not ok man! all broke!")
            }
            return res.json()
        })
        .then(this.props.addFolder, this.props.history.push('/'))
        .catch(error => console.log(error))
    }

    handleUpdate(name){
        this.setState({name})
    }


    render(){
        return (
            <>
            <ErrorBoundary>
            <form onSubmit={(e)=>this.validateForm(e)}>
            <label htmlFor="name">Folder Name:</label>
            <input type='text' name='name' onChange={(e)=>this.handleUpdate(e.target.value)}/>
            <button>Submit</button>
            </form>
            <FormError errorMessage={this.state.errorMessage}/>
            </ErrorBoundary>
            </>
        )
    }
}

export default AddFolder