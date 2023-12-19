# Backend services

Built using [Spring Framework](https://spring.io/projects/spring-framework).

## Requirements

[**Java**](https://openjdk.org/install/) - JDK 17 or higher.

[**Maven**](https://maven.apache.org/) - Version 3.6.3 or higher. [Installation Guide](https://maven.apache.org/install.html).

## How to run

Install project dependencies:

`./mvnw clean install`

Running the project:

`./mvnw spring-boot:run`

It will run at port `8080` on address `localhost`.

## Code structure

Folders in the `src/main/java/com/ies2324/projBackend` are organized as follows:

- **config** - contains configuration related files, such as `SecurityConfiguration.java` for Spring Security.

- **consumer** - contains the *RabbitMQ* queue consumer that receives keystroke data.

- **dao** - contains classes that define objects that will used as return and input values for different API endpoints.

- **entities** - contains all JPA entities and enums.

- **repositories** - contains defined repositories to access data with JPA.

- **services + impl** - contains service interfaces and respective implementations.

## Security

Every relevant endpoint requires authentication using [JSON Web Token](https://jwt.io/). This means that, in order to get authorization to access those endpoints, you must include the following *HTTP Header* - `Authorization: Bearer <Token>`.

There's also an endpoint for refreshing access tokens (`/api/auth/refreshToken`), so users can have a seamless experience in our web application, without needing to log in every single time the access token expires.

Keep that in mind if testing using some API testing tool.

The testing flow should be as follows:
                    
`Sign Up/Sign In (returns auth-token)` --------> `Query protected endpoints with "Bearer Token" header`

## API Documentation

Following the OpenAPI 3.0 Specification, our API documentation uses **Swagger** to display documentation about the various endpoints of our application, available at `localhost:8080/swagger-ui/index.html`.

It is relevant to mention that this is purely for documentation and not testing. Testing the API requires a `bearer token`, and should be performed using a tool such as Postman or Insomnia.

## References

[Documenting a Spring REST API Using OpenAPI 3.0](https://www.baeldung.com/spring-rest-openapi-documentation)
