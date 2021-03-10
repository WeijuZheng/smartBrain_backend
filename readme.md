# Smart Brain - Backend
This repository contains the server side logic of the full stack project - SmartBrain.

This web application allow users to do face detection using Clarifai API by providing only an image URL.

The tech stack contains Node.js, Express.js and Postgre SQL.

## Setup
Clone this repository, and install all the dependency of this app
```
npm install
```
Create a `.env` file under root directory and paste your Clarifai API key in it
```
CLARIFAI_APIKEY=<YOUR API KEY>
```
Finally run 
```
npm start
```

## Backend API
```
[METHOD]        [PATH]                              [detail]
POST            /register                           Register a new user
POST            /signin                             Signin a user
GET             /profile/:id                        Get the current user's information
POST            /imageurl                           Get the face detection result
PUT             /image                              Update user's image count
```

## Deployment
This app was deployed on Heroku. <br>
live demo at: https://app-smartbrain-frontend.herokuapp.com/