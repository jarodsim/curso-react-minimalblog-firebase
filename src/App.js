import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './global.css'
import firebase from './firebase'

import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Cadastro from './components/Cadastro'
import NovoPost from './components/NovoPost'

import Header from './components/Header'

class App extends Component {

  state = {
    firebaseInitianized: false
  }

  componentDidMount() {
    firebase.isInitialized().then((result) => {
      this.setState({
        firebaseInitianized: result
      })
    })
  }

  render() {
    return this.state.firebaseInitianized !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/cadastrar' component={Cadastro} />
          <Route exact path='/dashboard/new' component={NovoPost} />
        </Switch>
      </BrowserRouter>
    ) : (
        <h1>Carregando...</h1>
      )
  }
}

export default App;