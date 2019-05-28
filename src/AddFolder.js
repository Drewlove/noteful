import React, {Component} from 'react'; 
import FormError from './FormError';
import ErrorBoundary from './ErrorBoundary'; 
import PropTypes from 'prop-types';

class AddFolder extends Component{
    constructor(props){
        super(props)

        this.state={
            name: '', 
            hasError: false, 
            errorMessage: '', 
            error: null, 
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
        const url = `http://localhost:9000/api/folders`
        const options = {
            method: 'POST', 
            body: JSON.stringify({name: this.state.name}),
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
        .then(resJSON => this.props.addFolder(resJSON), this.props.history.push('/'))
        .catch(error => this.setState({error}))
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

AddFolder.propTypes = {
    addFolder: PropTypes.func, 
}

export default AddFolder