import React from 'react';
import { Link } from 'gatsby';
import logo from '../img/ml-logo-color.svg';

class Navbar extends React.Component {
  
  state = { showMenu: false }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }
 
  render() {
    const menuActive = this.state.showMenu ? 'is-active' : '';
    const burgerActive = this.state.showMenu ? 'is-active' : '';
    return (     
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src={logo} style={{ width: '50px' }} itemProp="image" alt="Maschine Learning Logo" />
              <div className="site-title">Maschine <span>Learning</span></div>
            </Link>
            <div className={`navbar-burger burger ${burgerActive}`} onClick={this.toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <div className={`navbar-menu ${menuActive}`} >
            <div className="navbar-start">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/products">
                Products
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
};

export default Navbar

