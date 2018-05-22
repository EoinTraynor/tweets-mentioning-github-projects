import React, {Component} from 'react'
import Project from './Project'

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            projects: [],
        };
    }

    // make request to the API
    componentWillMount(){            
        fetch('http://localhost:3000/football')
        .then(response => {
            if (!response.ok) {                 
                throw Error(response.statusText);
            }
            return response.json();        
        })
        .then(data => {
            this.setState({projects: data});            
        })
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    render () {
        const projects = this.state.projects;
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
                <p>Most relevant GitHub projects matching 'football' along with tweets mentioning it (max 5).</p>
                <div className="list-group">
                    {projectList}
                </div>
            </div>            
        )
    }
}