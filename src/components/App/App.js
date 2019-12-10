import React, { Component } from 'react';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import Modal from '../Modal/Modal';
import Nav from '../Nav/Nav'
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }

  render() {
    const {modalOpen} = this.state
    return (
      <main className="App">
        {modalOpen && <Modal />}
        <Nav />
        <Route
          path="/(login|signup)"
          render={() => <Modal />}
        />
        <PaletteContainer />
      </main>
    );
  }
}

export default App;

App.propTypes = {

}