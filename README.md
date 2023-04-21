# Getting Started

Welcome to our Prototype.

File or Folder | Purpose
---------|----------
`public` | frontend entypoint
`src` | frontend scripts
`srv/` | your service models and code go here
`db/` | your domain models and data go here
`package.json` | project metadata and configuration


## Instalation

1. Install Node.js for your OS
2. Instal cds globally `npm i -g @sap/cds-dk`
3. for VSC you can install the language pack extension `SAP CDS Language Support`
2. cd into project folder and run `npm install`
3. create empty database by running `cds deploy --to sqlite:db/data-model.db`

## Running the Project
(not final but works for now)

1. open the first Terminal and run `npm start` (for the frontend)
2. open a second Terminal and run `cds watch` (for the backend)


## Architecture

Frontend:
* React-three/fiber

Backend:
* CDS as Database and Model management
* Express.js as web API


## fix for broken pipe error

`sudo apt-get -f install`  
`sudo dpkg -i --force-overwrite <filename shown in error>`

-------------------------------------------------------

# Resources

## [SAP CDS (Cloud Application Programming Model)](https://cap.cloud.sap/docs/)
is used as the backend in combination with express as api  
[good entrypoint to start with](https://cap.cloud.sap/docs/get-started/)  
[another good starting point](https://developers.sap.com/mission.cp-starter-extensions-cap.html)  
[sap-cap example projects](https://github.com/SAP-samples/cloud-cap-samples)  
[node.js teil](https://cap.cloud.sap/docs/node.js/)  

## React

React Developer Tools [Broser Extension](https://react.dev/learn/react-developer-tools)  
Helps with debugging in the browser

## Three.js

### simple example project
https://codesandbox.io/s/peaceful-sara-39x28p?file=/public/index.html  
