import Joi from "joi-browser";
import React from "react";
import Select from "../select";
import Input from "./input";

class Form extends React.Component {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //console.log(result);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
    // if (name === "username") {
    //   if (value.trim() === "") {
    //     return "Username is required";
    //   }
    // }

    // if (name === "password") {
    //   if (value.trim() === "") {
    //     return "Password is required";
    //   }
    // }
  };

  // handleChange = e => {
  //   const data = {...this.state.data};
  //   data.username=e.currentTarget.value;
  //   this.setState({data});
  // }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <div className="text-center">
        <button disabled={this.validate()} className="btn-primary m-2">
          {label}
        </button>
      </div>
    );
  }

  renderInput(name, label, type="text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      ></Input>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      ></Select>
    );
  }

}

export default Form;
