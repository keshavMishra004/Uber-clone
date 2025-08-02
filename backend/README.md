# User Registration API

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint expects user details in the request body and returns a JWT token and user data upon successful registration.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, optional, minimum 3 characters if provided
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password" (string): User's password (minimum 6 characters),
    "token" (string): JWT Token
```


# User Login API

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
     }
  ```

### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invaild email or password"
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```
# User Profile API

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token (sent via cookie or Authorization header).

## Authentication

- Requires authentication (JWT token in cookie or `Authorization: Bearer <token>` header).

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // other user fields
  }
  ```
  ### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt_token_here>"
```

---

# User Logout API

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by clearing the authentication cookie and blacklisting the token.

## Authentication

- Requires authentication (JWT token in cookie or `Authorization: Bearer <token>` header).

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

  ### Example Request

```sh
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <jwt_token_here>"