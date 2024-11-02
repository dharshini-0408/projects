import React from 'react';
import LineItem from './LineItem';

function ItemsList({items,handleCheck,deleteList}){
    return(
        <ul>
            {items.map((item) => (
                <LineItem key={item.id}
                item={item}
                handleCheck = {handleCheck}
                deleteList = {deleteList}
                />
            ))}
    </ul>
    );
};

export default ItemsList;