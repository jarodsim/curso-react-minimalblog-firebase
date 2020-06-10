import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

import firebase from '../../firebase'

import './styles.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.entrar = this.entrar.bind(this)
    this.login = this.login.bind(this)
  }

  entrar(e) {
    e.preventDefault()

    this.login()
  }

  componentDidMount() {
    //Verificar se esta logado
    if (firebase.getCurrent()) {
      return this.props.history.replace('dashboard')
    }
  }

  login = async () => {
    const { email, password } = this.state
    try {
      await firebase.login(email, password)
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            alert('Este usuário não existe')
          } else {
            alert('Error:' + error.code)
          }
          return
        })

      if (firebase.getCurrent()) {
        return this.props.history.replace('dashboard')
      }

    } catch (error) {
      alert(error.message)
    }

  }

  render() {
    return (
      <div>
        <form onSubmit={this.entrar} id="login">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" autoComplete="off" autoFocus required value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="email@email.com" />

          <label htmlFor="password">Senha:</label>
          <input type="password" name="password" autoComplete="off" required autoFocus value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />

          <button type="submit">Entrar</button>

          <Link to='/cadastrar'>Ainda não possui uma conta?</Link>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);