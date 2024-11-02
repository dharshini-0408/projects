import React from 'react';
import { FaTrash } from 'react-icons/fa';

function LineItem({ item, handleCheck, deleteList }) {
    return (
        <li>
            <div className="checkbox-container">
                <input type="checkbox" checked={item.checked} className="checkbox" onChange={() => handleCheck(item.id)} />
                <label
                    style={item.checked ? { textDecoration: 'line-through' } : null}
                    onClick={() => handleCheck(item.id)}>
                    {item.content}
                </label>
            </div>
            <span className="btn">
                <FaTrash role="button" tabIndex="0" className="trash-icon" onClick={() => deleteList(item.id)} aria-label= {`Delete${item.item}`}/>
            </span>
        </li>
    );
}

export default LineItem;
