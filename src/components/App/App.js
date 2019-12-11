import React, { Component } from 'react';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Modal from '../Modal/Modal';
import { getUserProjects, getProjectPalettes } from '../../util/apiCalls';
import Nav from '../Nav/Nav'
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: null,
      projects: [],
      palettes: {}
    }
  }

  loadUserProjectsAndPalettes = async userID => {
    console.log(userID)
    this.setState({ userID: userID })
    let projects = await getUserProjects(userID);
    this.setState({ projects });
    let palettes = await projects.reduce(async (acc, project) => {
      return acc[project.id] = await getProjectPalettes(project.id)
    }, {});
    palettes = palettes.reduce((acc, palette) => {
      if (!acc[palette.project_id]) {
        acc[palette.project_id] = [palette];
      } else {
        acc[palette.project_id].push(palette)
      }
      return acc;
    }, {})
    this.setState({ palettes })
  }

  render() {
    return (
      <main className='App'>
        <Nav />
        <Route
          path="/(login|signup)"
          render={() => <Modal loadProjects={this.loadUserProjectsAndPalettes} />}
        />
        <Route exact path='/' render={() => <PaletteContainer />} />
        <Route exact path='/' render={() => <ProjectContainer projects={this.state.projects} palettes={this.state.palettes} />} />
      </main>
    );
  }
}

export default App;

App.propTypes = {

}