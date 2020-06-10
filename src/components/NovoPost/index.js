import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'

import './styles.css'
class NovoPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: '',
      descricao: '',
      autor: '',
      imagem: null,
      url: null,
      postagem: '',
      progress: 0
    }

    this.cadastrar = this.cadastrar.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  async componentDidMount() {
    if (await !firebase.getCurrent()) {
      this.props.history.replace('/login')
      return null
    }
  }

  async cadastrar(e) {
    e.preventDefault()

    let posts = firebase.app.ref('posts')
    // criando uma chave
    let chave = posts.push().key
    await posts.child(chave).set({
      titulo: this.state.titulo,
      imagem: this.state.url,
      descricao: this.state.descricao,
      autor: localStorage.getItem('nome')
    })

    this.props.history.push('/dashboard')
  }

  // Manipulando a imagem
  async handleFile(e) {
    const image = e.target.files[0]

    if (image.type === 'image/png' || image.type === 'image/jpeg') {
      await this.setState({
        imagem: image
      })

      this.handleUpload()

    } else {
      alert('Imagem não suportada | Aceitamos: .png, .jpeg |')
      this.setState({
        imagem: null
      })
    }
  }

  // Envia a imagem para o storage
  async handleUpload() {
    const { imagem } = this.state
    const uid = firebase.getCurrentUid()
    const uploadTask = firebase.storage.ref(`images/${uid}/${imagem.name}`).put(imagem)

    await uploadTask.on('state_changed', (snapshot) => {
      // progress
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

      this.setState({
        progress: progress
      })

    }, (e) => {
      // error
      alert('Erro ao enviar a imagem:' + e)
    }, () => {
      // sucesso
      firebase.storage.ref(`images/${uid}`).child(imagem.name).getDownloadURL()
        .then((url) => {
          this.setState({
            url: url
          })
        })
    })
  }
  render() {
    return (
      <div>
        <header id="new">
          <Link to="/dashboard">Voltar</Link>
        </header>

        <form onSubmit={this.cadastrar} id="new-post">
          <label htmlFor="titulo">Título:</label>
          <input type="text" name="titulo" placeholder="titulo do post" value={this.state.titulo} onChange={e => this.setState({ titulo: e.target.value })} autoFocus required />
          <br />

          <label htmlFor="imagem">Imagem:</label>
          <input type="file" name="imagem" onChange={this.handleFile} required />
          {
            this.state.url !== null ?
              <img src={this.state.url} alt="pré-visualização da imagem do post" />
              :
              <progress value={this.state.progress}/>
          }
          <br />

          <label htmlFor="descricao">Descrição:</label>
          <textarea type="text" name="descricao" placeholder="descricao do post" value={this.state.descricao} onChange={e => this.setState({ descricao: e.target.value })} required />
          <br />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
  }
}

export default withRouter(NovoPost);