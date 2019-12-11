import React, { Component } from 'react';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Modal from '../Modal/Modal';
import { getUserProjects, getProjectPalettes, deletePalette, deleteProject } from '../../util/apiCalls';
import Nav from '../Nav/Nav'
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: null,
      projects: [],
      palettes: {},
      projectName: '',
      paletteName: '',
      currentPalette: {},
      currentProject: {},
    }
  }

  loadUserProjectsAndPalettes = async userID => {
    console.log(userID)
    this.setState({ projects: [], palettes: {} })
    this.setState({ userID: userID })
    let projects = await getUserProjects(userID);
    // this.setState({ projects });
    let palettes = await projects.reduce(async (acc, project) => {
      return acc[project.id] = await getProjectPalettes(project.id)
    }, {});
    palettes = await palettes.reduce((acc, palette) => {
      console.log('foundPals --->',palettes)
      console.log('acc --->', acc, palette)
      if (!acc[palette.project_id]) {
        acc[palette.project_id] = [palette];
      } else {
        acc[palette.project_id].push(palette)
      }
      return acc;
    }, {})
    console.log(palettes)
    this.setState({ palettes })
  }

  select = (project, palette) => {
    console.log(project, palette)
    this.setState({
      currentProject: project,
      projectName: project.name,
      currentPalette: palette,
      paletteName: palette.name
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <main className='App'>
        <Nav />
        <Route
          path="/(login|signup)"
          render={() => <Modal loadProjects={this.loadUserProjectsAndPalettes} />}
        />
        <Route exact path='/' render={() => <PaletteContainer userID={this.state.userID} currentProject={this.state.currentProject} currentPalette={this.state.currentPalette} handleChange={this.handleChange} projectName={this.state.projectName} paletteName={this.state.paletteName} />} />
        {this.state.userID && <Route exact path='/' render={() => <ProjectContainer projects={this.state.projects} palettes={this.state.palettes} select={this.select} />} />}
      </main>
    );
  }
}

export default App;

App.propTypes = {

}