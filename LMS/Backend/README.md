
## Endpoints

### 1. User Registration

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",  // Required: User's name (3-5 characters)
    "email": "john@example.com",  // Required: User's email (must be unique)
    "password": "password123"  // Required: User's password (4-10 characters)
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "status": 201,
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "",  // Password is not returned for security reasons
        "role": "student",
        "enrolledCourses": [],
        "avatar": {
          "public_id": null,
          "url": null
        },
        "token": ""
      },
      "message": "User created successfully"
    }
    ```
  - **Error (400):**
    ```json
    {
      "status": 400,
      "message": "Please fill all fields"
    }
    ```

### 2. User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",  // Required: User's email
    "password": "password123"  // Required: User's password
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "status": 200,
      "data": {
        "user": {
          "name": "John Doe",
          "email": "john@example.com",
          "role": "student",
          "enrolledCourses": [],
          "avatar": {
            "public_id": null,
            "url": null
          }
        },
        "token": "JWT_TOKEN"  // JWT token for authentication
      },
      "message": "User logged in successfully"
    }
    ```
  - **Error (400):**
    ```json
    {
      "status": 400,
      "message": "Invalid credentials"
    }
    ```

### 3. User Logout

- **Endpoint:** `/logout`
- **Method:** `GET`
- **Description:** Log out the authenticated user.
- **Headers:**
  - `Authorization: Bearer JWT_TOKEN`  // Required: JWT token for authentication
- **Response:**
  - **Success (200):**
    ```json
    {
      "status": 200,
      "message": "User Logged Out Successfully"
    }
    ```

### 4. Get User Profile

- **Endpoint:** `/profile`
- **Method:** `GET`
- **Description:** Retrieve the authenticated user's profile.
- **Headers:**
  - `Authorization: Bearer JWT_TOKEN`  // Required: JWT token for authentication
- **Response:**
  - **Success (200):**
    ```json
    {
      "status": 200,
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "enrolledCourses": [],
        "avatar": {
          "public_id": null,
          "url": null
        }
      },
      "message": "User Profile"
    }
    ```

### 5. Update User Profile

- **Endpoint:** `/update-profile`
- **Method:** `PUT`
- **Description:** Update the authenticated user's profile.
- **Headers:**
  - `Authorization: Bearer JWT_TOKEN`  // Required: JWT token for authentication
- **Request Body:**
  ```json
  {
    "name": "John Doe Updated",  // Optional: Updated user's name
    "email": "john.updated@example.com"  // Optional: Updated user's email
  }
  ```
- **Form Data:**
  - `avatar`: File (optional) // User's avatar image
- **Response:**
  - **Success (200):**
    ```json
    {
      "status": 200,
      "data": {
        "name": "John Doe Updated",
        "email": "john.updated@example.com",
        "role": "student",
        "enrolledCourses": [],
        "avatar": {
          "public_id": "new_public_id",
          "url": "https://example.com/new_avatar.jpg"
        }
      },
      "message": "User Profile Updated"
    }
    ```

## Error Handling
All endpoints return appropriate error messages with status codes for various scenarios, such as missing fields, invalid credentials, or unauthorized access.

## Notes
- Ensure to replace `YOUR_PORT` with the actual port number your server is running on.
- The JWT token is required for protected routes and should be included in the `Authorization` header as `Bearer TOKEN`.