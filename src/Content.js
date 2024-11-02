import React from 'react';
import './Content.css';
import ItemsList from './ItemsList';

function Content({items,handleCheck,deleteList,length}) {
    return (
        <>
            {(items.length)?(
                <ItemsList items={items}
                handleCheck = {handleCheck}
                deleteList = {deleteList}
                length = {items.length}/>
            ):(
                <p id='empty_txt'>Your List is Empty </p>
            )
        }
        <p id="total">There are {length} {length === 1 ? "item" : "items"} in this ToDo List </p>
        </>
    );
}

export default Content;
