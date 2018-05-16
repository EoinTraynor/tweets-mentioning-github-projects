FROM node:8

RUN git clone https://github.com/EoinTraynor/tweets-mentioning-github-projects.git

WORKDIR tweets-mentioning-github-projects

RUN npm i

EXPOSE 8080

CMD ["npm", "run app"]