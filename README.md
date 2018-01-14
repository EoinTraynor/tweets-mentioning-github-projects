# Tweets Mentioning Github Projects
This application searches for "Football" projects on GitHub, then, for each project, searches for any tweets mentioning it.

## Built With
- NodeJS
- Express
- React

## Requirements
- Twitter API Application: 'TWITTER_CONSUMER_KEY' & 'TWITTER_CONSUMER_SECRET'

## Instructions


```bash
git clone https://github.com/EoinTraynor/tweets-mentioning-github-projects.git && cd tweets-mentioning-github-projects
```

Install dependencies
```bash
npm i
```

Run backend application
```bash
npm start
```

Run react application (another terminal)
```
npm run web
```

## Issues and Improvements
- **Issue:** Searching GitHub projects for 'football' (11824 matches) returns multiple results of projects called football. Searching twitter by project 'name' (e.g. football) or alternatively 'full_name' (e.g. xiaoqiu206/football) does not return useful tweets or likely even not refer to the project itself.
**Potential solutions:** modify the search to return the random projects with over 1000 stars. This will likely ensure that the projects (e.g. React) will have multiple relevant tweet mentions.

- Improve UI

- Modify the API to take search queries params rather than just 'football'
