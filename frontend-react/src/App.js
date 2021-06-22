import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/user/add";
import AddTransaction from "./components/transaction/add";
import IndexTransaction from "./components/transaction/index";
import DetailsTransaction from "./components/transaction/details";
import Login from "./components/auth/login";

import { connect } from "react-redux"
import actions from "./actions/login"

import AuthDataService from "./services/auth.service";


class App extends Component {

  authenticated() {

    AuthDataService.authorized()
      .then(response => {
        alert(`Id: ${response.data.id} \nNome: ${response.data.name}`)
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <h4 style={{color: "white"}}>
            FrontEnd
            </h4>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/transactions"} className="nav-link">
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addUser"} className="nav-link">
                Adicionar Usuário
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link" onClick={(e) => this.props.logout() }>

              {this.props.token == null ? 
              ( <div>Login</div>)
               : 
              (<div>Logout</div>)
              }
              </Link>

            </li>
            <li className="nav-item">
              {this.props.token == null ? 
              ( <div></div>)
               : 
              (  <buttom onClick={this.authenticated}  className="btn btn-sm"><i className="fa fa-fw fa-user" style={{color: "white", fontSize: "20px", paddingTop: "5px"}}></i></buttom>)
              }
            </li>
          </div>
        </nav>
        

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/transactions"]} component={IndexTransaction} />
            <Route exact path="/addUser" component={AddUser} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/addTransaction" component={AddTransaction} />
            <Route path="/transactions/:id" component={DetailsTransaction} />
          </Switch>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
	token: state.loginUser.token
});

const mapDispatchToProps = dispatch => ({
	logout: (token) => dispatch(actions.logout(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App)


