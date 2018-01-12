var express = require('express');
var router = express.Router();
const axios = require('axios');
// Keep secret
let bearerToken = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(consumerKey);
  res.render('index', { title: 'Express' });
});

router.get('/twitter', function(req, res, next) {  
  // get bearer token
  const consumerKey = process.env.TWITTER_CONSUMER_KEY;
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
  const cat = encodeURIComponent(consumerKey)+":"+encodeURIComponent(consumerSecret);
  var credentials = new Buffer(cat).toString('base64');

  axios({
    method: 'post',
    url: 'https://api.twitter.com/oauth2/token',
    data: 'grant_type=client_credentials',
    headers: {
      "Authorization": "Basic " + credentials,
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    }
  })
  .then(function (response) {
    if (response.data.token_type == 'bearer') {
      bearerToken = response.data.access_token;
      const searchTerm = "twitterapi";
      // make request to twitter
      axios({
        method: 'get',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        params: {
          q: encodeURIComponent("@"+searchTerm),
          count: 1
        },
        headers: {
          "Authorization": "Bearer " + bearerToken
        }
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }    
  })
  .catch(function (error) {
    console.log(error);
  });    

  res.render('index', { title: 'Express' });
});

router.get('/github', function(req, res, next) {  
  let projects = null;
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
  // check bearer token
  // .then()
  // check twitter api for tweets mentioning the repo        
  .then(response => {    
    projects = response.data.items;    
    let projectPromises = [];
    if(projects.length > 0){      
      projects.map((project, index) => {    
        // make twitter request with project name (not full_name?)
        // push each request to an array
        projectPromises.push(axios.get('https://jsonplaceholder.typicode.com/posts/1'));             
      });
      // perform multiple concurrent requests from the array
      return axios.all(projectPromises);
    }    
  })
  .then(
    axios.spread((...args) => {
      // loop through each of the completed promises
      args.map((item, index) => {
        // add array of tweets to each project
        projects[index].tweets = item.data;        
      });
      console.log(projects);    
    })
  )      
  .catch(error => {
    console.log(error);
  });  
});

module.exports = router;
