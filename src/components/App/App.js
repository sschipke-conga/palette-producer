import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Modal from '../Modal/Modal';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAllPalettes, setAllProjects } from "../../actions/index";
import { getUserProjects, getProjectPalettes} from '../../util/apiCalls';
import Nav from '../Nav/Nav'
import { Route } from 'react-router-dom';


export class App extends Component {

  loadUserProjectsAndPalettes = async () => {
    const { setAllProjects, setAllPalettes, user } = this.props
    try {
      let projects = await getUserProjects(user.user_id);
      setAllProjects(projects)
      let palettePromises = [];
      await projects.forEach(project => {
        palettePromises.push(getProjectPalettes(project.id));
      });
      setAllPalettes(await Promise.all(palettePromises));
    } catch ({message}) {
      console.error(message)
    }
  };

  render() {
    const { isMenuActive } = this.props
    return (
      <main className="App">
        <Route
          path="/(login|signup)"
          render={() => (
            <div>
              <Nav />
            <Modal loadProjects={this.loadUserProjectsAndPalettes} />
                <PaletteContainer
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
              />
              {isMenuActive && (
                <ProjectContainer
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
    },
    dispatch
  );

  export const mapStateToProps = state => ({
    user: state.user,
    isMenuActive: state.isMenuActive
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  setAllPalettes: PropTypes.func.isRequired,
  setAllProjects: PropTypes.func.isRequired,
  isMenuActive: PropTypes.bool.isRequired
}