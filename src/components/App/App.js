import React, { Component } from 'react';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Modal from '../Modal/Modal';
import { getUserProjects, getProjectPalettes, deletePalette, deleteProject, saveProject, savePalette, updatePalette, updateProject } from '../../util/apiCalls';
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
    } catch ({ message }) { console.log(message) }
  };

  removeProject = async e => {
    let projectId = parseInt(e.target.id);
    try {
      await deleteProject(projectId);
      this.loadUserProjectsAndPalettes(this.state.userID);
    } catch ({ message }) { console.log(message) }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  save = async colors => {
    if (this.state.userID) {
      const { currentPalette } = this.state
      let oldColors = [currentPalette.color1, currentPalette.color2, currentPalette.color3, currentPalette.color4, currentPalette.color4]
      let newColors = Object.values(colors)
      if (!this.state.currentProject.name) {
        var project = await saveProject({ user_id: this.state.userID, name: this.state.projectName })
        this.setState({ currentProject: await project.id })
      } else if (this.state.currentProject.name !== this.state.projectName) {
        updateProject({ id: this.state.currentProject.id, name: this.state.projectName })
      }
      if (!this.state.currentPalette.name) {
        let paletteName = this.state.paletteName;
        let project_id = this.state.currentProject.id || project.id;
        const palette = { name: paletteName, ...colors, project_id: project_id };
        await savePalette(palette);
      } else if (this.state.currentPalette.name !== this.state.paletteName) {
        updatePalette({
          id: this.state.currentPalette.id,
          name: this.state.paletteName,
          project_id: this.state.currentProject.id,
          ...colors
        });
      } else if (oldColors !== newColors) {
        updatePalette({
          id: this.state.currentPalette.id,
          name: this.state.paletteName,
          project_id: this.state.currentProject.id,
          ...colors
        });
      }
      this.loadUserProjectsAndPalettes(this.state.userID);
    }
  }

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
              save={this.save}
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