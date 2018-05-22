import React, {Component} from 'react'

export default class Project extends Component {
    render(){
        const {index, item} = this.props;
        const cardStyle = {
            margin:"20px 0",
        }        
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