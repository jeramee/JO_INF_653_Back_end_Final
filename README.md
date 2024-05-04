# INF653 Back End Web Development - Final Project

## Project Overview

The final project involves building a Node.js REST API for US States data using Express and MongoDB. This project aims to create a robust API that provides various endpoints for accessing state information, including fun facts, capitals, nicknames, populations, and admission dates.

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

