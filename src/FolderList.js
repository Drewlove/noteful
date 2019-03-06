import React, {Component} from 'react'; 
import {NavLink} from 'react-router-dom';
import NotefulContext from './NotefulContext'; 

class FolderList extends Component{

    static contextType = NotefulContext; 

    render(){
        const folders = this.context.folders.map((folder, index) => {
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

export default FolderList
