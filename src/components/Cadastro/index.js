import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from '../../firebase'


import './styles.css'
class Cadastro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      password: ''
    }

    this.cadastrar = this.cadastrar.bind(this)
    this.onCadastro = this.onCadastro.bind(this)
  }

  componentDidMount() {
    if (firebase.auth.currentUser) {
      //Desloga o user caso esteja logado
      firebase.auth.signOut()
    }
  }

  cadastrar(e) {
    e.preventDefault()
    this.onCadastro()
  }

  async onCadastro() {
    try {
      const { nome, email, password } = this.state

      await firebase.cadastrar(nome, email, password)

      this.props.history.replace('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    return (
      <div>
        <h1 className="register-h1">Novo Usuário</h1>
        <form onSubmit={this.cadastrar} id="register">
          <label htmlFor="nome">Nome:</label>
          <input type="text" name="nome" id="nome" required autoFocus autoComplete="off" value={this.state.nome} onChange={e => this.setState({ nome: e.target.value })} />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required autoComplete="off" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
          <br />
          <label htmlFor="senha">Senha:</label>
          <input type="password" name="senha" id="senha" required autoComplete="off" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Cadastro);