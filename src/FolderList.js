import React, {Component} from 'react'; 
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types'; 

class FolderList extends Component{

    render(){
        const folders = this.props.folders.map((folder, index) => {
            return (
                <NavLink 
                to={`/folder/${folder.id}`} 
                key={index}
                className='sidebar-btn'
                >
                {folder.name}
                </NavLink>
            )
        })

        return (
            <div>{folders}</div>
        )
    }
}

FolderList.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired, 
        name: PropTypes.string.isRequired
    })) 

}

export default FolderList
