import React, {Component} from 'react'
import Project from './Project'
import axios from 'axios';

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            projects: [],
            searchTerm: ''
        };
    }

    handleSearchChange(e) {
        this.setState({ searchTerm: e.target.value });
    }
    
    handleSearchSubmit() {
        const { searchTerm } = this.state;
        this.searchForProject(searchTerm);
    }

    // make request to the API
    searchForProject(project) {        
        axios({
            method: 'get',
            url: `http://localhost:3000/search`,
            params: {
                project: project
            }
        })
        .then(response => {
            if (response.status !== 200) {                 
                throw Error(response.statusText);
            }
            console.log(response.data);
            this.setState({projects: response.data});                        
        })
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    componentWillMount(){            
        this.searchForProject('react');    
    }

    render () {
        const { projects, searchTerm } = this.state;
        // const searchTerm = this.state.searchTerm;
        let projectList = projects.map((item, index) => {
            return(                 
                <div key={index}>
                    <Project index={index} item={item}/>
                </div>
            )
        });
        return(
            <div className="container">            
                <h1>Tweets mentioning the </h1>
                <p>Search for a Github repository with more than 5000 starts and see the most recent tweets relating to the project.</p>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Search for Project" value={searchTerm} onChange={this.handleSearchChange.bind(this)}></input>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleSearchSubmit.bind(this)}>Search</button>
                {/* <div className="list-group">
                    {projectList}
                </div> */}
            </div>            
        )
    }
}