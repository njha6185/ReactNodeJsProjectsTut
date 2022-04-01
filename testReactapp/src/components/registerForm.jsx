import Joi from "joi-browser";
import React from "react";
import Form from "./common/form";

import * as userService from '../services/userService'
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {username:"",password:"",name:""},
    errors:{}
  }
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).label("Password").required(),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try{
      const response=await userService.register(this.state.data);
      auth.loginWithJWT(response.headers['x-suth-token'])
      //this.props.history.push("/")
      window.location("/"); //Full eload of application
      console.log("Registered");
    }catch(ex){
      if(ex.response && ex.reponse.status===400){
        const errors={...this.state.errors};
        errors.username=ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div className="row mt-5">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="m-2">Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username","email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default RegisterForm;
