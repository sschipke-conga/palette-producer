import React, { Component } from 'react';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Modal from '../Modal/Modal';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCurrentPalette, setAllPalettes, setAllProjects } from "../../actions/index";
import { getUserProjects, getProjectPalettes, deletePalette, deleteProject, saveProject, savePalette, updatePalette, updateProject } from '../../util/apiCalls';
import Nav from '../Nav/Nav'
import { Route } from 'react-router-dom';
import allPalettes from '../../reducers/allPalettes';


export class App extends Component {
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

  componentDidMount() {
  }

  loadUserProjectsAndPalettes = async userID => {
    const { setAllProjects, setAllPalettes } = this.props
    await this.setState({ projects: [], palettes: {} });
    await this.setState({ userID: userID });
    try {
      let projects = await getUserProjects(userID);
      setAllProjects(projects)
      let palettePromises = [];
      await projects.forEach(project => {
        palettePromises.push(getProjectPalettes(project.id));
      });
      setAllPalettes(await Promise.all(palettePromises));
    } catch ({message}) {
      console.error(message)
      this.setState({projects: [], palettes: {}})
    }
  };

  select = (project, palette) => {
    this.setState({
      currentProject: project,
      projectName: project.name,
      currentPalette: palette,
      paletteName: palette.name
    });
  };

  // removePalette = async e => {
  //   let paletteId = parseInt(e.target.id);
  //   try {
  //     await deletePalette(paletteId);
  //     this.loadUserProjectsAndPalettes(this.state.userID);
  //   } catch ({ message }) { console.error(message) }
  // };

  // removeProject = async e => {
  //   let projectId = parseInt(e.target.id);
  //   try {
  //     await deleteProject(projectId);
  //     this.loadUserProjectsAndPalettes(this.state.userID);
  //   } catch ({ message }) { console.error(message) }
  // };

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };


  render() {
    const {currentPalette, isMenuActive} = this.props
    return (
      <main className="App">
        <Route
          path="/(login|signup)"
          render={() => (
            <div>
              <Nav />
            <Modal loadProjects={this.loadUserProjectsAndPalettes} />
                <PaletteContainer
                userID={this.state.userID}
                currentPalette={currentPalette}
                handleChange={this.handleChange}
                projectName={this.state.projectName}
                paletteName={this.state.paletteName}
                save={this.save}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Nav />
              <PaletteContainer
                userID={this.state.userID}
                handleChange={this.handleChange}
                projectName={this.state.projectName}
                paletteName={this.state.paletteName}
                save={this.save}
              />
              {isMenuActive && (
                <ProjectContainer
                  projects={this.state.projects}
                  palettes={this.state.palettes}
                  select={this.select}
                  removePalette={this.removePalette}
                  removeProject={this.removeProject}
                />
              )}
            </div>
          )}
        />
      </main>
    );
  }
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAllPalettes,
      setAllProjects,
      setCurrentPalette,
    },
    dispatch
  );

  export const mapStateToProps = state => ({
    allPalettes: state.allPalettes,
    allProjects: state.allProjects,
    currentPalette: state.currentPalette,
    user: state.user,
    isMenuActive: state.isMenuActive
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {

}