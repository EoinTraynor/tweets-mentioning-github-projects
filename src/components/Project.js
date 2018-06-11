import React, {Component} from 'react'

export default class Project extends Component {
    render(){
        const {index, item} = this.props;
        
        const capFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        const tweets = item.tweets.map((tweet, index) => {
            return <li key={index} className="list-group-item">{tweet.text}</li>
        });
        return(            
            <div key={index} className="project card">
                <div className="card-body">
                    <div>
                        <img className="card-img img-tumbnail float-right" src={item.owner.avatar_url} alt="Avatar Img"/>
                        <h5 className="card-title">{capFirstLetter(item.name)}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{capFirstLetter(item.owner.login)}</h6>
                    </div>
                    <p className="card-text">{item.description}</p>
                    <a href={item.html_url} className="card-link">Project Link</a>
                </div>
            </div>
        )
    }
}