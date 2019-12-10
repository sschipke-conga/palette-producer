import React, { Component } from 'react';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import Modal from '../Modal/Modal';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <main className='App'>
        <Route exact path='/' render={() => <PaletteContainer />} />
      </main>
    )
  }
}

export default App;

App.propTypes = {

}