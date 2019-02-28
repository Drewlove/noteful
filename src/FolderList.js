import React, {Component} from 'react'; 
import {NavLink} from 'react-router-dom';
import STORE from './store';

class FolderList extends Component{
    render(){
        const folders = STORE.folders.map((folder, index) => {
            return (
                <NavLink 
                to={`/folder/${folder.id}`} 
                key={index}
                className='sidebar-btn'>
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
