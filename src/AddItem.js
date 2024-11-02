import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

function AddItem({newItem,setNewItem,addList}){
    let inputRef = useRef()
    return(
        <form className='addForm' onSubmit={addList}>
            <input autoFocus id='addItem' type='text' placeholder='Add ToDo List' required ref={inputRef} value={newItem} onChange={(e)=>setNewItem(e.target.value)}/>
            <button type='submit' aria-label='Add Item' onClick={()=> inputRef.current.focus()}>
            <FaPlus/>
            </button>
        </form>
    );
};
export default AddItem;