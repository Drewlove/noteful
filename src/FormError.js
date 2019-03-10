import React from 'react'; 

function FormError(props){
    if(props.errorMessage === ''){
        return null
    }
    return (
        <div>
            {props.errorMessage}
        </div>
    )
}

export default FormError