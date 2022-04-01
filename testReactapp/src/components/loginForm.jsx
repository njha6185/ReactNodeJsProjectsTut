import Joi from "joi-browser";
import React, { Component } from "react";
import Form from "./common/form";
import auth from "../services/authService"
import { Link } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: {username:"",password:""},
    errors:{}
  }
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try{

     await auth.login(this.state.data.username, this.state.data.password);
     
     //this.props.history.push("/")
     const {state}=this.props.location;
     window.location=state?state.from.pathname:"/"; //Full eload of application
      console.log("Submitted");
    }catch(ex){
      if(ex.response && ex.reponse.status===400){
        const errors={...this.state.errors};
        errors.username=ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    if(auth.getCurrentUser()) return <Link tp="/"/>
    return (
      <div className="row mt-5">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="m-2">Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password","password")}

            {this.renderButton("Login")}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default LoginForm;
