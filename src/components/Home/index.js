import React, { Component } from 'react';
import firebase from '../../firebase'

import './styles.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    firebase.app.ref('posts').once('value', (snapshot) => {
      let state = this.state

      state.posts = []

      snapshot.forEach((childitem) => {
        state.posts.push({
          key: childitem.key,
          titulo: childitem.val().titulo,
          imagem: childitem.val().imagem,
          descricao: childitem.val().descricao,
          autor: childitem.val().autor
        })
      })
      // O último vem primeiro
      state.posts.reverse()
      this.setState({
        state
      })
    })
  }

  render() {
    let posts = this.state.posts
    return (
      <section id="post">
        {posts.map((post) => {
          return (
            <article key={post.key}>
              <header>
                <div className="title">
                  <strong>{post.titulo}</strong>
                  <span>Autor: {post.autor}</span>
                </div>
              </header>
              <img src={post.imagem} alt={`capa do post ${post.titulo}`} />
              <footer>
                <p>{post.descricao}</p>
              </footer>
            </article>
          )
        })}
      </section>
    )
  }
}

export default Home;