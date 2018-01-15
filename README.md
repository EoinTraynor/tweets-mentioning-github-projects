# Tweets Mentioning Github Projects
This application searches for "Football" projects on GitHub, then, for each project, searches for any tweets mentioning it.

## Built With
- NodeJS
- Express
- React

## Requirements
- Twitter API Application: 'TWITTER_CONSUMER_KEY' & 'TWITTER_CONSUMER_SECRET'

## Instructions
Write your twitter api key and secret to local env
```bash
export TWITTER_CONSUMER_KEY=*your_twitter_consumer_key*
export TWITTER_CONSUMER_SECRET=*your_twitter_consumer_secret*
```

Clone the repo
```bash
git clone https://github.com/EoinTraynor/tweets-mentioning-github-projects.git && cd tweets-mentioning-github-projects
```

Install dependencies
```bash
npm i
```

Run application (front and backend)
```bash
npm run app
```

Application runs on [localhost port 8080](http://localhost:8080/)

## Issues and Improvements
- **Issue:** Searching GitHub projects for 'football' (11824 matches) returns multiple results of projects called football. Searching twitter by project 'name' (e.g. football) or alternatively 'full_name' (e.g. xiaoqiu206/football) does not return useful tweets or likely even not refer to the project itself.
**Potential solutions:** modify the search to return the random projects with over 1000 stars. This will likely ensure that the projects (e.g. React) will have multiple relevant tweet mentions.

- Improve UI

- Modify the API to take search queries params rather than just 'football'
