import React, { Component } from 'react';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Modal from '../Modal/Modal';
import { getUserProjects, getProjectPalettes } from '../../util/apiCalls';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: 2,
      projects: [],
      palettes: {}
    }
  }

  componentDidMount = async () => {
    let projects = await getUserProjects(this.state.userID);
    this.setState({ projects });
    let palettes = await projects.reduce(async (acc, project) => {
      return acc[project.id] = await getProjectPalettes(project.id)
    }, {});
    this.setState({ palettes })
  }

  render() {
    return (
      <main className='App'>
        <Route exact path='/' render={() => <PaletteContainer />} />
        {/* <Route exact path='/' render={() => <ProjectContainer projects={this.state.projects} palettes={this.state.palettes} />} /> */}
      </main>
    )
  }
}

export default App;

App.propTypes = {

}