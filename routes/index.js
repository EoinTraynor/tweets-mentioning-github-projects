var express = require('express');
var router = express.Router();
const axios = require('axios');

let bearerToken = null;

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.json({ title: 'Express' });
});

/* GET football search. */
router.get('/football', function(req, res, next) {  
  let projects = null;
  /* GITHUB REQUEST*/
  // 11824 matching results for 'football'    
  // Default: results are sorted by best match
  // searching for top 10 projects, as brief states
  // "As the Twitter API is rate limited retrieving tweets for a maximum of 10 projects will be sufficient"
  axios({
    method: 'get',
    url: 'https://api.github.com/search/repositories',
    params: {
      // refine search by adding additional params            
      q: 'football',
      per_page: 10
    }
  })
  /* TWITTER REQUEST*/  
  .then(response => {
    // store projects
    projects = response.data.items;    
      // get bearer token
      const consumerKey = process.env.TWITTER_CONSUMER_KEY;
      const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
      const cat = encodeURIComponent(consumerKey)+":"+encodeURIComponent(consumerSecret);
      var credentials = new Buffer(cat).toString('base64');

      return axios({
        method: 'post',
        url: 'https://api.twitter.com/oauth2/token',
        data: 'grant_type=client_credentials',
        headers: {
          "Authorization": "Basic " + credentials,
          "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        }
      })     
  })
  // handle bearerToken
  // check twitter api for tweets mentioning the repo        
  .then(response => {    
    if (response.data.token_type == 'bearer') {
      // set bearer token
      bearerToken = response.data.access_token;
      
      // make requests to twitter  
      let projectPromises = [];
      if(projects.length > 0){      
        projects.map((project, index) => {    
          console.log(project.name);          
          // push each request to an array
          projectPromises.push(
            axios({
              method: 'get',
              url: 'https://api.twitter.com/1.1/search/tweets.json',
              params: {
                // make twitter request with project name (not full_name?)
                // I'm confused: half the project names are 'football'
                // the results set will be very strange using 'name' or 'full_name'
                q: encodeURIComponent("@"+project.name),
                // I have limited the number of tweets to 5
                count: 5
              },
              headers: {
                "Authorization": "Bearer " + bearerToken
              }
            })
          );             
        });
        // perform multiple concurrent requests from the array
        return axios.all(projectPromises);
      }              
    }
  })
  .then(
    axios.spread((...args) => {
      // loop through each of the completed promises
      args.map((item, index) => {
        // add array of tweets to each project
        projects[index].tweets = item.data.statuses;        
      });      
      console.log(projects[0].tweets.length);
      res.json(projects);
    })    
  )      
  .catch(error => {
    console.log(error);
  });  
});

module.exports = router;
