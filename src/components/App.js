import axios from 'axios';
import React, { Component } from 'react';
import Project from './Project';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      searchTerm: 'React',
      flags: {
        searchForProjectLoading: false,
      },
    };
  }

  componentWillMount() {
    this.searchForProject(this.state.searchTerm);
  }

  // make request to the API
  searchForProject(project) {
    this.state.flags.searchForProjectLoading = true;
    axios({
      method: 'get',
      url: 'http://localhost:3000/search',
      params: {
        project,
      },
    })
      .then((response) => {
        this.state.flags.searchForProjectLoading = false;
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log('Looks like there was a problem: \n', error);
      });
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  handleSearchSubmit = () => {
    const { searchTerm } = this.state;
    this.searchForProject(searchTerm);
  }
  render() {
    const { projects, searchTerm, flags } = this.state;
    const { searchForProjectLoading } = flags;
    const Loading = <div>Loading</div>;
    const projectList = projects.map((item, index) => {
      return (
        <div key={item.id}>
          <Project index={index} item={item} />
        </div>
      );
    });
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="row justify-content-lg-center">
              <div className="col-lg-6">
                <h1 className="jumbotron-heading">Tweets mentioning &quot;{searchTerm}&quot;</h1>
                <p className="lead text-muted">Search for a Github repository and see the best match along with the most recent tweets relating to the project.</p>
                <div className="form-group">
                  <input className="form-control" type="text" placeholder="Project Name" value={searchTerm} onChange={this.handleSearchChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleSearchSubmit}>Search for Project</button>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row justify-content-lg-center">
            <div className="col-lg-6">
              {searchForProjectLoading &&
                Loading
              }
              {projectList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
