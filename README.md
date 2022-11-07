# 304CEM Web API Development
> A MERN (MongoDB, Express, React, Node.js) stack project created by Vincent Lee Di Qian for 304CEM Web API Development coursework.

## App Info
> Name: Countries & Universities API  
> Author: Vincent Lee Di Qian (11324205 | P19010904)  
> Version: 1.0.0

## Quick Start
> Install dependencies for server
```
npm install
```
> Install dependencies for client
```
npm run client-install
```
> Run the client & server with concurrently
```
npm run dev
```
> Run the Express server only
```
npm run server
```
> Run the React client only
```
npm run client
```
Server runs on http://localhost:5000 and client on http://localhost:3000

## Note
- node_modules is excluded from being pushed into this repository.
- A .gitignore is generated when the project is created, and it contains the line that excludes the node_modules from being pushed into this repository.
- This is because the folder size can be very large (several hundreds of Mb), and it would cause the duration of the push to be very long, and not up-to-date with the server.
- Therefore, if you want to run the project locally, you will have to run npm i before ng serve, which is widely accepted as a standard.
