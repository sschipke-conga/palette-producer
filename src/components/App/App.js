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
      projectName: "",
      paletteName: "",
      currentPalette: {},
      currentProject: {}
    };
  }

  loadUserProjectsAndPalettes = async userID => {
    await this.setState({ projects: [], palettes: {} });
    await this.setState({ userID: userID });
    let projects = await getUserProjects(userID);
    await this.setState({ projects });
    let palettePromises = [];
    await projects.forEach(project => {
      palettePromises.push(getProjectPalettes(project.id));
    });
    await this.setState({ palettes: await Promise.all(palettePromises) });
  };

  select = (project, palette) => {
    this.setState({
      currentProject: project,
      projectName: project.name,
      currentPalette: palette,
      paletteName: palette.name
    });
  };

  removePalette = async e => {
    let paletteId = parseInt(e.target.id);
    try {
      await deletePalette(paletteId);
      this.loadUserProjectsAndPalettes(this.state.userID);
    } catch ({ message }) {console.log(message)}
  };

  removeProject = async e => {
    let projectId = parseInt(e.target.id);
    console.log('ProjectId ---->', e.target.id)
    try {
      await deleteProject(projectId);
      this.loadUserProjectsAndPalettes(this.state.userID);
    } catch ({ message }) {console.log(message)}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <main className="App">
        <Nav />
        <Route
          path="/(login|signup)"
          render={() => (
            <Modal loadProjects={this.loadUserProjectsAndPalettes} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <PaletteContainer
              userID={this.state.userID}
              currentProject={this.state.currentProject}
              currentPalette={this.state.currentPalette}
              handleChange={this.handleChange}
              projectName={this.state.projectName}
              paletteName={this.state.paletteName}
            />
          )}
        />
        {this.state.userID && (
          <Route
            exact
            path="/"
            render={() => (
              <ProjectContainer
                projects={this.state.projects}
                palettes={this.state.palettes}
                select={this.select}
                removePalette={this.removePalette}
                removeProject={this.removeProject}
              />
            )}
          />
        )}
      </main>
    );
  }
}

export default App;

App.propTypes = {

}