import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'


import './styles.css'
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: localStorage.getItem('nome'),
      email: localStorage.getItem('email')
    }

    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    if (!firebase.getCurrent()) {
      this.props.history.replace('/login')
      return null
    }

    firebase.getUserName((info) => {
      localStorage.setItem('nome', info.val().nome)
      localStorage.setItem('email', info.val().email)
      this.setState({ nome: info.val().nome, email: info.val().email })
    })
  }

  async logout() {
    await firebase.logout()
    localStorage.removeItem('nome')
    localStorage.removeItem('email')
    this.props.history.push('/')
  }

  render() {
    return (
      <div id="dashboard">
        <div className="user-info">
          <h1>Olá, {this.state.nome}</h1>
          <Link to="/dashboard/new">Novo Post</Link>
        </div>
        <p>Logado com: {this.state.email}</p>
        <button onClick={this.logout}>Deslogar</button>
      </div>
    )
  }
}

export default Dashboard;