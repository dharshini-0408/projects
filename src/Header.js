import React from 'react';

function Header({header}){
    return(
        <header>
            <h1>{header}</h1>
        </header>    
        );
};
// Header.defaultProps = {
//     header:"ToDo List"
// };
export default Header;