import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
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
                <h1>Results matching Football</h1>
                <p>Most relevant GitHub projects matching 'football' along with tweets mentioning it (max 5).</p>
                <div className="list-group">
                    {projectList}
                </div>
            </div>            
        )
    }
}

class Project extends Component {
    render(){
        const {index, item} = this.props;
        const cardStyle = {
            margin:"20px 0",
        }
        console.log(item);
        const tweets = item.tweets.map((tweet, index) => {
            return <li key={index} className="list-group-item">{tweet.text}</li>
        });
        return(
            // <div className="project-item">
            //     <li key={index}> {item.name} {item.description}</li>          
            // </div>
            <div className="card" style={cardStyle}>
                <div className="card-block">
                    <h4 className="card-title">{item.name}</h4>              
                    <p className="card-text">{item.description}</p>
                    <a href={item.html_url} className="card-link">Project link</a>              
                    {/* <a href={item.html_url} className="card-link">Show {item.tweets.length} matching tweets</a>               */}
                </div>
                <ul className="list-group list-group-flush">
                    {tweets}
                </ul>
          </div>
        )
    }
}

render(<App/>, document.getElementById('app'));