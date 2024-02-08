# Java Spring Boot + SQLite + Oauth2

## Getting started
To run the spring boot API: \
`mvn clean install -DskipTests` \
`mvn spring-boot:run`

## API Endpoints
This section outlines the available RESTful API endpoints of the application.
Each endpoint's purpose, required request method, and expected inputs/outputs are described below.
All API endpoints listed below are accessible from the local development server, which runs on `localhost:8080` by default.
Ensure that your local development server is running before attempting to access these endpoints. 

### Base URL
- **Hello world**
  - **GET** `/`
  - Default hello world response
  - **Responses:**
    - String: `Hello world`

- **Status** 
  - **GET** `/status`
  - Retrieves the current status of the server
  - **Responses:**
    - `200 OK` with string `Server is up :)`
- **Secured**
  - **GET** `/secured`
  - Only returns if user is logged in
  - **Responses:**
    - String `Hello, secured!`

### User Management
- **List Users**
  - **Get** `/users`
  - Retrieves a list of all users
  - **Responses:**
    - `200 OK` with a json array of all users

### Game Management
- **List Games**
    - **Get** `/games`
    - Retrieves a list of all games
    - **Responses:**
        - `200 OK` with a json array of all games

### GameList Management
- **List Game-lists**
    - **Get** `/lists`
    - Retrieves a list of all game-lists
    - **Responses:**
        - `200 OK` with a json array of all game-lists

## Dependencies
This project uses the following dependencies:

- **Spring Boot Starter Web**: Provides all the dependencies needed to build a web application. This includes embedded Tomcat and Spring MVC.
- **Spring Boot Starter Web Services**: Facilitates building SOAP Web Services.
- **Spring Boot Starter Data JPA**: Allows easy implementation of JPA-based repositories.
- **Spring Boot DevTools**: Provides fast application restarts, LiveReload, and configurations for enhanced development experience. This dependency is marked as optional and scoped for runtime.
- **JsonPath**: Library for reading and querying JSON data.
- **Spring Boot Starter Test**: Includes testing tools such as JUnit, Hamcrest, and Mockito. Scoped for test.
- **SQLite JDBC**: JDBC driver for SQLite databases.
- **Hibernate Community Dialects**: Offers additional dialects for Hibernate ORM.
- **Spring Boot Starter OAuth2 Client**: Provides support for modern OAuth2 and OpenID Connect for Spring applications.
- **Spring Boot Starter Security**: Adds authentication and authorization capabilities to the application.