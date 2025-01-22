# Teacher API Documentation

## Endpoints

### 1. Add Teacher
- **Endpoint:** `POST /add`
- **Description:** Adds a new teacher to the system.
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",          // Required: String
    "email": "john.doe@example.com", // Required: String, must be unique
    "phoneNumber": "9876543210",     // Required: String, must be a valid 10-digit number
    "subjects": ["Math", "Science"], // Required: Array of Strings
    "joiningDate": "2023-01-01",     // Required: String (date format)
    "qualifications": "M.Sc. in Math", // Required: String
    "experience": "5 years",          // Required: String
    "street": "123 Main St",          // Optional: String
    "city": "New York",               // Required: String
    "state": "NY",                    // Required: String
    "zipCode": "10001"                // Required: String, must be a 6-digit number
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 201,
    "data": {
      "_id": "60d5ec49f1b2c8b1f8e4e1a1",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "9876543210",
      "subjects": ["Math", "Science"],
      "joiningDate": "2023-01-01",
      "qualifications": "M.Sc. in Math",
      "experience": "5 years",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001"
      }
    },
    "message": "Teacher added successfully"
  }
  ```

### 2. Get All Teachers
- **Endpoint:** `GET /get-all-teachers`
- **Description:** Retrieves a list of all teachers.
- **Response Example:**
  ```json
  {
    "status": 200,
    "data": [
      {
        "_id": "60d5ec49f1b2c8b1f8e4e1a1",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "phoneNumber": "9876543210",
        "subjects": ["Math", "Science"],
        "joiningDate": "2023-01-01",
        "qualifications": "M.Sc. in Math",
        "experience": "5 years",
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001"
        }
      }
    ],
    "message": "Teachers fetched successfully"
  }
  ```

### 3. Get Teacher by ID
- **Endpoint:** `GET /get-teacher-byid/:teacherId`
- **Description:** Retrieves a teacher by their ID.
- **Path Parameter:**
  - `teacherId`: Required, the ID of the teacher.
- **Response Example:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "60d5ec49f1b2c8b1f8e4e1a1",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "9876543210",
      "subjects": ["Math", "Science"],
      "joiningDate": "2023-01-01",
      "qualifications": "M.Sc. in Math",
      "experience": "5 years",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001"
      }
    },
    "message": "Teacher fetched successfully"
  }
  ```

### 4. Add Time Table for Teacher
- **Endpoint:** `POST /add-time-table/:teacherId`
- **Description:** Adds a timetable entry for a specific teacher.
- **Path Parameter:**
  - `teacherId`: Required, the ID of the teacher.
- **Request Body:**
  ```json
  {
    "day": "Monday",                  // Required: String, must be a valid day
    "subject": "Math",                // Required: String
    "startTime": "09:00",             // Required: String (time format)
    "endTime": "10:00",               // Required: String (time format)
    "roomNumber": "101",              // Required: String
    "className": "Class 10",          // Required: String
    "section": "A"                    // Required: String, must be one of ["A", "B", "C", "D"]
  }
  ```
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Timetable updated successfully",
    "teacher": { /* Teacher object with updated timetable */ }
  }
  ```

### 5. Delete Time Table Period
- **Endpoint:** `DELETE /delete-timetable/:teacherId`
- **Description:** Deletes a specific period from a teacher's timetable.
- **Path Parameter:**
  - `teacherId`: Required, the ID of the teacher.
- **Request Body:**
  ```json
  {
    "day": "Monday",                  // Required: String
    "periodId": "60d5ec49f1b2c8b1f8e4e1a2" // Required: String, ID of the period to delete
  }
  ```
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Period deleted successfully",
    "teacher": { /* Teacher object with updated timetable */ }
  }
  ```

### 6. Update Time Table Period
- **Endpoint:** `PUT /update-timetable/:teacherId`
- **Description:** Updates a specific period in a teacher's timetable.
- **Path Parameter:**
  - `teacherId`: Required, the ID of the teacher.
- **Request Body:**
  ```json
  {
    "day": "Monday",                  // Required: String
    "periodId": "60d5ec49f1b2c8b1f8e4e1a2", // Required: String, ID of the period to update
    "subject": "Math",                // Optional: String
    "startTime": "09:00",             // Optional: String (time format)
    "endTime": "10:00",               // Optional: String (time format)
    "roomNumber": "101",              // Optional: String
    "className": "Class 10",          // Optional: String
    "section": "A"                    // Optional: String
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "data": { /* Teacher object with updated timetable */ },
    "message": "Period updated successfully"
  }
  ```

## Notes
- All date fields should be in the format `YYYY-MM-DD`.
- All time fields should be in the format `HH:MM`.
- Ensure to validate the input data before sending requests to the API.
