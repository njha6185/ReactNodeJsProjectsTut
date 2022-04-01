import React, { Component, useState } from 'react';

function Counter() {
    const [count,setCount]=useState(1);

    const formatCount=()=>{
        const formatCount=count;
        return formatCount===0?<h1>Zero</h1>:<h1>{count}</h1>;
    }
    
    return (<React.Fragment>
        
        <span>{formatCount()}</span>
        <button>Increment</button>
    </React.Fragment>
    );
}

export default Counter;