# Peruvian Football Results

<p align="center">
  This API is designed to manage and serve information about Peruvian football results, including match and team details.
</p>

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
      <img src="https://img.shields.io/badge/Node.js-18.x-52B255?logo=node.js" alt="Node.js">
  </a>
  <a href="https://expressjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Express-4.x-black?logo=express" alt="Express">
   </a>
  <a href="https://www.mongodb.com/" target="_blank">
      <img src="https://img.shields.io/badge/MongoDB-8.x-55AD47?logo=mongodb" alt="MongoDB">
   </a>
   <a href="https://mongoosejs.com/" target="_blank">
      <img src="https://img.shields.io/badge/Mongoose-8.9.x-red?logo=mongoose" alt="Mongoose">
   </a>
</p>

## Project Purpose

The main objective of this API is to serve as a personal tool for managing and consulting Peruvian football data. Although it is initially for private use, there is a possibility of making it public in the future as a paid service.

## Technologies Used

- **Node.js** and  **Express**: To build the API.
- **Nodemon**: To restart the server during development.
- **Morgan**: To log HTTP requests.
- **MongoDB**: Database for storing information about matches, teams, results, and other details.
- **Mongoose**: To model MongoDB data in JavaScript and interact with the database.

## Main Features

- **Match Results**: Retrieve results and match details.
- **Image Manager**: Serve images related to teams and matches.
- **Database Connection**: Uses MongoDB to store and retrieve information.

## System Requirements

- Node.js v16 or higher.
- MongoDB v5 or higher.
- npm package manager.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/usuario/API-ScorePe.git
   cd API-ScorePe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory with the following fields:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/nombre_de_tu_bd
   ```

4. Start the server in development mode:
   ```bash
   npm run dev
   ```
## Environment Variables

Set up an `.env` file with the following parameters:

- **MONGO_USER**: MongoDB user related to the database.
- **MONGO_PASSWORD**: Password for the MongoDB user.
- **MONGO_SERVER**: IP address of the MongoDB server.
- **MONGO_PORT**: Port of the MongoDB server.
- **MONGO_DATABASE**: Name of the database.
- **PORT**: Port where the Express server runs.

## Usage

- Available endpoints:

  - `GET /api/division`: Retrieves division information.
  - `GET /api/map`: Retrieves map svg.
  - `GET /api/teams`: Retrieves team information.
  - `GET /api/lastgames`: Retrieves information on the latest matches.
  - `GET /api/performance`: Retrieves team statistics.
  - `GET /api/results`: Retrieves match results.
  - `GET /api/statistics`: Retrieves team statistics.
  - `GET /api/stadium`: Retrieves stadium information.
  - `GET /api/managers`: Retrieves coach information.
  - `GET /api/fixture`: Retrieves fixture information.

## Licencia

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.