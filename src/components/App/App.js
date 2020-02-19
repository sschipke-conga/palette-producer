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
    // if (localStorage.getItem("user")) {
    //   const savedUser = JSON.parse(localStorage.getItem("user"));
    //   this.setState({userID: savedUser.user_id})
    //   this.loadUserProjectsAndPalettes(savedUser.user_id)
    // }
  }

  loadUserProjectsAndPalettes = async userID => {
    const { setAllProjects, setAllPalettes } = this.props
    console.log(setAllPalettes, setAllProjects)
    await this.setState({ projects: [], palettes: {} });
    await this.setState({ userID: userID });
    try {
      let projects = await getUserProjects(userID);
      // await this.setState({ projects });
      console.log(projects)
      setAllProjects(projects)
      let palettePromises = [];
      await projects.forEach(project => {
        palettePromises.push(getProjectPalettes(project.id));
        console.log(palettePromises)
      });
      // await this.setState({ palettes: await Promise.all(palettePromises) });
      // let resolvedPalettes = await Promise.all(palettePromises)
      // console.log(resolvedPalettes)
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

  // save = async colors => {
  //   if (this.state.userID) {
  //     const { currentPalette } = this.state
  //     let oldColors = [currentPalette.color1, currentPalette.color2, currentPalette.color3, currentPalette.color4, currentPalette.color4]
  //     let newColors = Object.values(colors)
  //     if (!this.state.currentProject.name && this.state.projectName && this.state.paletteName) {
  //       var project = await saveProject({ user_id: this.state.userID, name: this.state.projectName })
  //       this.setState({ currentProject: await project.id })
  //     } else if (this.state.currentProject.name !== this.state.projectName) {
  //       updateProject({ id: this.state.currentProject.id, name: this.state.projectName })
  //     }
  //     if (!this.state.currentPalette.name && this.state.paletteName && this.state.projectName) {
  //       let paletteName = this.state.paletteName;
  //       let project_id = this.state.currentProject.id || project.id;
  //       const palette = { name: paletteName, ...colors, project_id: project_id };
  //       await savePalette(palette);
  //     } else if (this.state.currentPalette.name !== this.state.paletteName && this.state.projectName && this.state.paletteName) {
  //       updatePalette({
  //         id: this.state.currentPalette.id,
  //         name: this.state.paletteName,
  //         project_id: this.state.currentProject.id,
  //         ...colors
  //       });
  //     } else if (oldColors !== newColors && this.state.projectName && this.state.paletteName) {
  //       updatePalette({
  //         id: this.state.currentPalette.id,
  //         name: this.state.paletteName,
  //         project_id: this.state.currentProject.id,
  //         ...colors
  //       });
  //     }
  //     this.loadUserProjectsAndPalettes(this.state.userID);
  //   }
  // }


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
                // currentPalette={currentPalette}
                handleChange={this.handleChange}
                projectName={this.state.projectName}
                paletteName={this.state.paletteName}
                save={this.save}
              />
              {this.s}
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