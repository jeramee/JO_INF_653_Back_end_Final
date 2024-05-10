## INF653 Back End Web Development - US States API

### Description

The US States API is a RESTful API built using Node.js, Express, and MongoDB to provide access to state data and fun facts about US states. The documentation includes setup, usage, and endpoints. The final project aims to create a robust API for US States data using Express and MongoDB, offering various endpoints for accessing state information such as fun facts, capitals, nicknames, populations, and admission dates. The README.md file serves as documentation for the API's setup, usage, and endpoints.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/us-states-api.git
```

2. Install dependencies:

```
cd us-states-api
npm install
```

3. Set up environment variables:
Create a .env file in the root directory and add the following environment variables:

```
MONGODB_URI=your_mongodb_uri
PORT=3000
```

4. Start the server:

```
npm start
```

### Usage

Once the server is running, you can access the API endpoints using a tool like Postman or by making HTTP requests from your application.

Example request:

http

GET http://localhost:3000/states

### Project Requirements

1. **Database Setup:**
   - Utilize a MongoDB database to store state information.
   - Create a States.js model file to represent the MongoDB collection.
   - Define a Mongoose Schema for the model, including stateCode and funfacts properties.

2. **Data Handling:**
   - Utilize a provided states.json file to access most of the states data.
   - Populate the MongoDB collection with state data and additional fun facts.
   - Ensure uniqueness of stateCode property and format of funfacts array.

3. **Deployment:**
  
   - Utilize environment variables for sensitive data, avoiding inclusion of .env file in the GitHub repository.

4. **Root URLs:**
   - Define root URLs for both HTML page and REST API.
   - Additional API endpoints should be added under the /states/ route.
   - Implement a catch-all route to handle 404 errors.

5. **GET Requests:**
   - Implement various GET requests to retrieve state data:
     - Retrieve all state data.
     - Filter states by contiguity.
     - Retrieve data for a specific state.
     - Retrieve random fun fact for a state.
     - Retrieve state capital, nickname, population, and admission date.

6. **POST Request:**
   - Implement a POST request to add fun facts about a state.

7. **PATCH Request:**
   - Implement a PATCH request to replace a fun fact.

8. **DELETE Request:**
   - Implement a DELETE request to remove a fun fact.

### Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install dependencies.
3. Set up MongoDB and ensure it's running.
4. Configure environment variables for MongoDB connection.
5. Run the project using `npm start`.

### Project Structure

- **index.js:** Main entry point of the application.
- **routes/states.js:** Route handlers for states-related endpoints.
- **models/States.js:** Mongoose model for MongoDB collection.
- **states.json:** JSON file containing additional state data and fun facts.
- **.env:** Environment variables file (not included in repository).
- **.gitignore:** Configuration file for Git.

### Dependencies

- Node.js
- Express
- Mongoose
- MongoDB

### Acknowledgments

This project was completed as part of the INF653 course. Special thanks to the instructor for guidance and support.

Example response:

```
[
  {
    "stateCode": "CA",
    "name": "California",
    "capital": "Sacramento",
    "population": 39538223,
    "admissionDate": "1850-09-09"
  },
  {
    "stateCode": "TX",
    "name": "Texas",
    "capital": "Austin",
    "population": 29145505,
    "admissionDate": "1845-12-29"
  },
  ...
]
```

Endpoints

The API provides the following endpoints:

```
    GET /states: Get all state data
    GET /states/:state: Get data for a specific state
    GET /states/:state/funfact: Get a random fun fact for a specific state
    POST /states/:state/funfact: Add a new fun fact for a specific state
    PATCH /states/:state/funfact: Update a fun fact for a specific state
    DELETE /states/:state/funfact: Delete a fun fact for a specific state
```

This project is licensed under the Apache v2 - see the LICENSE file for details.


This README provides information about how to install and use the US States API, including instructions for setting up the environment, making requests to the API, and details about the available endpoints. It also includes sections on contributing to the project and licensing information.