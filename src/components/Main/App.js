/**
 * App.js
 * main handler for the app, loads the major components
 */
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProgressTracker from './ProgressTracker/ProgressTracker';
import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
  }

  //handler for the <Menu> component inside of <Header>
  handleMenuToggle(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  render() {
    return (
      <div className="App" >
        <Header menuOpen={this.state.menuOpen} title={process.env.REACT_APP_TITLE} handleMenuToggle={(state) => this.handleMenuToggle(state)} />
        <main>
          <ProgressTracker />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
