import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './styles.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <header id="main-header">
        <div className='header-content'>
          <Link to='/'>Minimal Blog</Link>
          <Link to='/login'>Entrar</Link>
        </div>
      </header>
    )
  }
}

export default Header;