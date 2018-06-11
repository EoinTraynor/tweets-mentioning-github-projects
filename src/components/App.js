import React, {Component} from 'react'
import Project from './Project'
import axios from 'axios';

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            projects: [],
            searchTerm: 'React'
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
        this.searchForProject(this.state.searchTerm);    
    }

    render () {
        const { projects, searchTerm } = this.state;                
        let projectList = projects.map((item, index) => {
            return(                 
                <div key={index}>
                    <Project index={index} item={item}/>
                </div>
            )
        });
        return(
            <div>
                <section className="jumbotron text-center">
                    <div className="container">                        
                        <h1 className="jumbotron-heading">Tweets mentioning '{searchTerm}'</h1>
                        <p className="lead text-muted">Search for a Github repository and see the best match along with the most recent tweets relating to the project.</p>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Project Name" value={searchTerm} onChange={this.handleSearchChange.bind(this)}></input>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSearchSubmit.bind(this)}>Search for Project</button>
                    </div>            
                </section>                
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {projectList}
                        </div>
                    </div>
                </div>                    
            </div>
        )
    }
}