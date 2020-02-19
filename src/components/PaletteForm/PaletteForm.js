
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../util/apiCalls";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {savePalette, saveProject} from '../../util/apiCalls'
import { setCurrentPalette, addPalette, removePalette, addProject} from "../../actions/index";
import "./PaletteForm.test";



class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      paletteName: '',
      projectName: '',
      projectId: '',
      error: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.savePalette()
    e.target.reset()
  };

  displayProjectOptions = () => {
    return this.props.allProjects.map((project, index) => {
    return <option key={'Option' + project.id}value={project.id}>{project.name}</option>
    })
  }

  savePalette = async () => {
    const {paletteName, projectId, projectName} = this.state
    const {currentPalette, user, addPalette, addProject} = this.props
    const paletteToPost = {
      color1: currentPalette[0].hexCode,
      color2: currentPalette[1].hexCode,
      color3: currentPalette[2].hexCode,
      color4: currentPalette[3].hexCode,
      color5: currentPalette[4].hexCode,
      name: paletteName,
      project_id: parseInt(projectId)
    };
    console.log(paletteToPost)
    if(projectId === 'CreateNew' ) {
      try {
        const res = await saveProject({name: projectName, user_id: user.user_id})
        addProject(res)
        paletteToPost.project_id = res.id
        let newPalette = await savePalette(paletteToPost)
        addPalette(newPalette)
        this.reset()
      } catch ({error}) {
        console.error(error)
      }
    } else {
      try {
        let newPalette = await savePalette(paletteToPost);
        addPalette(newPalette);
        this.reset()
      } catch ({error}) {
        console.error(error)
      }
    }
  }

  reset = () => {
    this.setState({projectName: '', paletteName:'', projectId:'', error:''})
  }



  render() {
    const { paletteName, projectName, error, projectId,} = this.state;

    let loginErrrorClass = error ? "input-error" : "";
    return (
      <form onSubmit={this.handleSubmit}>
        {error ? <p className="error-message">{error}</p> : null}
        <div className="form-label-input-div">
          <label htmlFor="password">Project</label>
          <select
            value={projectId}
            onChange={this.handleChange}
            id="projectId"
            required
          >
            <option value="" defaultValue>
              Please select a project
            </option>
            <option value="CreateNew" defaultValue>
              Create a new project
            </option>
            {this.displayProjectOptions()}
          </select>
        </div>
        {projectId === "CreateNew" && (
          <div className="form-label-input-div">
            <label htmlFor="paletteName">Project Name</label>
            <input
              type="text"
              placeholder="New Project's Name"
              id="projectName"
              required
              value={projectName}
              onChange={this.handleChange}
            />
          </div>
        )}
        <div className="form-label-input-div">
          <label htmlFor="paletteName">Palette Name</label>
          <input
            type="text"
            className={loginErrrorClass}
            placeholder="Enter your username"
            id="paletteName"
            required
            value={paletteName}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Save Palette</button>
      </form>
    );
  }
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addPalette,
      addProject,
      removePalette,
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

export default connect(mapStateToProps, mapDispatchToProps)(PaletteForm);

