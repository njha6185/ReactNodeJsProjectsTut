import React, { Component } from 'react';
import App from '../App';
import AppM from '../AppM';

class ChangeProject extends Component {
    handleVidelyClick=()=>{
        console.log("Clicked");
        <AppM />
    }
    render() {
        return (


            <div>
                <div className="row ">
                    <div className="col"></div>
                    <div className="col">
                        <button onClick={this.handleVidelyClick} className="btn btn-primary">Videly Project</button>
                    </div>
                </div>
                <div className="row ">
                    <div className="col"></div>
                    <div className="col">
                        <button onClick={<AppM />} className="btn btn-secondary">counter Project</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangeProject;