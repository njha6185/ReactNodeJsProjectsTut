import React from 'react';

const ListGroup=(props) => {
    const {items:generes,textProperty,valueProperty,onItemSelect,selectedItem}=props;
    return ( <div>
        <ul className="list-group">
            {generes.map((genere) => (
              <li key={genere[valueProperty]} 
              onClick={()=>onItemSelect(genere)}
              className={genere===selectedItem?"list-group-item active":"clickable list-group-item"}>
                {genere[textProperty]}
              </li>
            ))}
          </ul>
    </div> );
}

ListGroup.defaultProps={
    textProperty:"name",
    valueProperty:"_id"
}

export default ListGroup;