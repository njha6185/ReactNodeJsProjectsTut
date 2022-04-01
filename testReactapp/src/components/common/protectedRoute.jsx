import React, { Component } from 'react';

function ProtectedRoute({path,component:Component,render,...rest}) {
    return ( 
        <Route 
        {...rest}
                        render={props=>{
                            if(!this.state.user) return <Link to={{
                                pathname:"/login",
                                state:{from:props.location}
                            }}/>;
                            return Component?<Component {...props} />:render(props);
                        }}></Route>
     );
}

export default ProtectedRoute;