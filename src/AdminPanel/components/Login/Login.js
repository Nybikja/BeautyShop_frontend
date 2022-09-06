import React, { Component } from "react";
// import CheckButton from "react-validation/build/button";
import AuthService from "../../../service/auth.service";
import { Button, Form } from "antd";
import { Input } from "antd";

import "./Login.scss"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    // this.form.validateAll();
    // if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
        //   this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
          console.log(resMessage);
        }
      );
    // } else {
    //   this.setState({
    //     loading: false
    //   });
    // }
  }
  render() {
    return (
      <div className="login-window">
          <Form
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
                <Button variant="primary" className="save-btn my-2" onClick={this.handleLogin}>
                    Submit
                </Button>
            {this.state.message && (
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>)}
          </Form>
      </div>
    );
  }
}