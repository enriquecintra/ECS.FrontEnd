import React, { Component } from "react";
import AuthDataService from "../../services/auth.service";

import { connect } from "react-redux"
import actions from '../../actions/login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    this.state = {
      login: "",
      password: "", 
      token: "",
      errors: this._errors,
      ok: false,
    };
  }

  _errors = {
    ModelInvalid: "",
    Username: [],
    Password: [],
    error: ""
  }

  
  login() {
    var data = {
      username: this.state.login,
      password: this.state.password
    };

    AuthDataService.authorize(data)
      .then(response => {
        this.setState({
          token: response.data.token,
          errors: this._errors,
          ok: true
        });
        console.log(response.data);
        this.props.login(this.state.token);
      })
      .catch(e => {
        console.log(e);
        if(e.response.status === 404)
            this.setState({
                errors: {...this.state.errors, ...e.response.data, ModelInvalid: "" }
            });
        else{
            this.setState({
                errors: {...this.state.errors, ...e.response.data, ModelInvalid: "Dados Inválidos!", error: "" }
            });
        }
      });
  }


  showError(array){
    return array.map(item => <span style={{ color: "red"}}>{item}</span>).reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null);
  }


  render() {
    return (

        (this.state.ok || this.props.token != null) ?
        (<div><h4>Logado!!!</h4></div>)
        :
            (
            <div className="submit-form">
                <div>
                    <div className="form-group">
                    <label htmlFor="title">Login</label> <label>{this.showError(this.state.errors.Username)}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={this.state.login}
                        onChange={(e) => this.setState({login: e.target.value, errors: { ...this.state.errors, Username: [] }})}
                        name="title"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="title">Password</label> <label>{this.showError(this.state.errors.Password)}</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value, errors: { ...this.state.errors,  Password: [] }})}
                        name="password"
                    />
                    </div>
                

                    <br />
                    <span style={{ color: "red"}}>{this.state.errors.ModelInvalid} {this.state.errors.error}</span>

                    <br /><br />
                    <button onClick={this.login} className="btn btn-success">
                    Login
                    </button>
                </div>
                
            </div>
            )
    );
  }
}

const mapStateToProps = (state) => ({
	token: state.loginUser.token
});

const mapDispatchToProps = dispatch => ({
	login: (token) => dispatch(actions.login(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)