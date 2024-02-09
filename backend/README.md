# Java Spring Boot + SQLite + Oauth2

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

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
    
#### To be added
- **Create User**
  - **POST** `/users`
  - Creates a new user with the provided data.
  - **Request Body:** JSON object containing user details (`username`, `email`)
  - **Responses:**
    - `201 Created` if the user is successfully created.
    - `400 Bad Request` if the request data is invalid.
    
- **Update User**
  - **PATCH** `/users/{username}`
  - Updates a user with given username
  - **Path Parameters**
    - `username` (required): The username of the user to retrieve.
  - **Request Body:** JSON object containing information to be updated. e.g {`email`: `new email`}
  - **Responses:**
    - `200 OK` if the information was successfully added.
    - `400 Bad Request` if the request fails to update the user.
    
- **Delete User**
  - **DELETE** `/users/{username}`
  - Tries to delete user with given username.
  - **Path Parameters**
  - `username` (required): The username of the user to delete.
  - **Responses:**
    - `200 OK` if the user was deleted.
    - `400 Bad Request` if the request fails to delete.
    
- **Get User**
  - **Get** `/users/{username}`
  - Retrieves a user with given username.
  - **Path Parameters**
    - `username` (required): The username of the user to retrieve.
  - **Responses:**
    - `201 Created` with a JSON object of the user.
    - `400 Bad Request` if the request data is invalid.
    
- **Get Users game-lists**
  - **GET** `/users/{username}/lists`
  - Retrieves the given users game-lists.
  - **Path Parameters**
    - `username` (required): The username of the user to retrieve.
  - **Responses:**
    - `201 Created` with a JSON array of the users game-list.
    - `400 Bad Request` if the request data is invalid.
    
- **Get Users made games**
  - **GET** `/users/{username}/created_games`
  - **Path Parameters:**
    - `username` (required): The username of the user to retrieve.
  - **Responses:**
    - `201 Created` with a JSON array of the users created games.
    - `400 Bad Request` if the request data is invalid.

### Game Management
- **List Games**
    - **Get** `/games`
    - Retrieves a list of all games.
    - **Responses:**
        - `200 OK` with a json array of all games.
      
#### To be added
- **Create Game**
  - **POST** `/games`
  - Creates a new game with the provided data.
  - **Request Body:** JSON object containing game details (`gamename`, `description`, etc)
  - **Responses:**
    - `201 Created` if the game is successfully created.
    - `400 Bad Request` if the request data is invalid.
    
- **Update Game**
  - **PATCH** `/games/{ID}`
  - Updates a game with the given id
    - **Path Parameters:**
      - `ID` (required): The username of the user to retrieve.
    - **Request Body:** JSON object containing information to be updated. e.g {`description`: `new description`}
    - **Responses:**
      - `200 OK` if the information was successfully updated.
      - `400 Bad Request` if the request fails to update the game.
      
- **Delete Game**
  - **DELETE** `/games/{ID}`
    - Tries to delete game with given id
    - **Path Parameters:**
    - `ID` (required): The id of the game to delete.
    - **Responses:**
      - `200 OK` if the game was deleted.
      - `400 Bad Request` if the request fails to delete.
      
- **Get Game**
  - **Get** `/games/{ID}`
  - Retrieves a game with given id.
  - **Path Parameters:**
    - `ID` (required): The id of the game to retrieve.
  - **Responses:**
    - `201 Created` with a JSON object of the game.
    - `400 Bad Request` if the request data is invalid.
    
- **Get Games by filter**
  - **GET** `/games`
  - Retrieves a list of games by given filter.
  - **Request parameters**:
    - `search` (optional): A string to filter games by name. If not specified, no name filtering is applied.
    - `sort` (optional):  Specifies the property by which the list of games should be sorted.
      - Sort parameters that are accepted: `rating`, `name`, `releaseDate`, `players`, `duration`. Default is `rating`.
    - `category` (optional): Categories to filter games by. Multiple can be selected. Seperated with a comma `,`
      - Categories that are accepted: ...
    - `duration-min` (optional): How short a games can be. Default value is 0.
    - `duration-max` (optional): How long a game can be. Default value is ∞.
    - `players` (optional): How many players a game should have.

### GameList Management
- **List Game-lists**
    - **Get** `/lists`
    - Retrieves a list of all game-lists
    - **Responses:**
        - `200 OK` with a json array of all game-lists

#### To be added
- **Create Game-list**
- **Update Game-list**
- **Delete Game-list**
- **Get Game-list**
- **Get Game-list games**

### Review Management
#### To be added
- **List Reviews**
- **Create Review**
- **Update Review**
- **Delete Review**
- **Get Reviews of user**
- **Get Reviews of game**

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