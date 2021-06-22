import React, { Component } from "react";
import UserDataService from "../../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.new = this.new.bind(this);

    this.state = {
      id: null,
      login: "",
      password: "", 
      email: "",
      name: "",
      birthDate: "",

      errors: this._errors,

      submitted: false
    };
  }

  _errors = {
    Login: [],
    Password: [], 
    Email: [],
    Name: [],
    BirthDate: [],
    ModelInvalid: "",
    error: ""
  }

  
  save() {
    var data = {
      login: this.state.login,
      password: this.state.password, 
      email: this.state.email,
      name: this.state.name,
      birthDate: this.state.birthDate,
      errors: this._errors
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          login: response.data.title,
          password: response.data.password,
          email: response.data.email,
          name: response.data.name,
          birthDate: response.data.birthDate,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.setState({
          errors: {...this.state.errors, ...e.response.data, ModelInvalid: "Dados Inválidos!" }
        });

      });
  }

  new() {
    this.setState({
        id: null,
        login: "",
        password: "", 
        email: "",
        name: "",
        birthDate: Date.now(),
        submitted: false,
        errors: this._errors
    });
  }


  showError(array){
    return array.map(item => <span style={{ color: "red"}}>{item}</span>).reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null);
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Adicionado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.new}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Login</label> <label>{this.showError(this.state.errors.Login)}</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.login}
                onChange={(e) => this.setState({login: e.target.value, errors: { ...this.state.errors, Login: [] }})}
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
            <div className="form-group">
              <label htmlFor="title">Email</label> <label>{this.showError(this.state.errors.Email)}</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value, errors: { ...this.state.errors,  Email: [] }})}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Nome</label> <label>{this.showError(this.state.errors.Name)}</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={(e) => this.setState({name: e.target.value, errors: { ...this.state.errors,  Name: [] }})}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Data de Nascimento</label> <label>{this.showError(this.state.errors.BirthDate)}</label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                required
                value={this.state.birthDate}
                onChange={(e) => this.setState({birthDate: e.target.value, errors: { ...this.state.errors, BirthDate: []}})}
                name="birthDate"
              />
            </div>

            <br />
            <span style={{ color: "red"}}>{this.state.errors.ModelInvalid} {this.state.errors.error}</span>

            <br /><br />
            <button onClick={this.save} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}