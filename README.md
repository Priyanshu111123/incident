# Incident Logger API

A simple Express.js and MongoDB-based REST API to manage incident records.

## Installation

1. Extract the zip file.  
2. Open the terminal.  
3. Navigate to the backend folder.  
4. Run the following commands:

```bash
npm install
node server.js
Usage with Postman
Seed Initial Data
Method: GET

URL: http://localhost:3000/incidents/seed

Get All Incidents
Method: GET

URL: http://localhost:3000/incidents

Get Incident by ID
Method: GET

URL: http://localhost:3000/incidents/{id}

Delete Incident by ID
Method: DELETE

URL: http://localhost:3000/incidents/{id}

Add a New Incident
Method: POST

URL: http://localhost:3000/incidents

In Postman:

Go to the Body tab

Select raw

Choose JSON format

Enter the incident data