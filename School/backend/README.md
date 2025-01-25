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

# Class API Endpoints

This document outlines the API endpoints for managing classes in the School application.

## Endpoints

### 1. Create Class
- **Endpoint:** `POST /api/class/create`
- **Description:** Create a new class.
- **Request Body:**
  ```json
  {
    "className": "Class A" // Required: String, must be one of the predefined class names
  }
  ```
- **Response:**
  - **Status Code:** 201
  - **Body:**
  ```json
  {
    "status": 201,
    "data": {
      "_id": "classId",
      "className": "Class A",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "message": "Class created successfully"
  }
  ```

### 2. Get All Classes
- **Endpoint:** `GET /api/class/get-all-class`
- **Description:** Retrieve all classes.
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": [
      {
        "_id": "classId",
        "className": "Class A",
        "studentsId": ["studentId1", "studentId2"],
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "message": "All classes fetched successfully"
  }
  ```

### 3. Get Class by ID
- **Endpoint:** `GET /api/class/get-class-byid/:classId`
- **Description:** Retrieve a class by its ID.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "classId",
      "className": "Class A",
      "studentsId": ["studentId1", "studentId2"],
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "message": "Class fetched successfully"
  }
  ```

### 4. Add Students to Class
- **Endpoint:** `PUT /api/class/add-student/:classId`
- **Description:** Add students to a class.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Request Body:**
  ```json
  {
    "studentsId": ["studentId1", "studentId2"] // Required: Array of Strings (ObjectId)
  }
  ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "classId",
      "studentsId": ["studentId1", "studentId2", "studentId3"],
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "message": "Students added to class successfully"
  }
  ```

### 5. Remove Student from Class
- **Endpoint:** `DELETE /api/class/remove-student/:classId`
- **Description:** Remove a student from a class.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Request Body:**
  ```json
  {
    "studentId": "studentId" // Required: String (ObjectId)
  }
  ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "classId",
      "studentsId": ["studentId1", "studentId2"],
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "message": "Student removed from class successfully"
  }
  ```

### 6. Add Subjects to Class
- **Endpoint:** `PUT /api/class/add-subjects/:classId`
- **Description:** Add subjects to a class.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Request Body:**
  ```json
  {
    "subjects": ["Math", "Science"] // Required: Array of Strings
  }
  ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "classId",
      "subjects": ["Math", "Science"],
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "message": "Successfully added new subjects to the class"
  }
  ```

### 7. Remove Subject from Class
- **Endpoint:** `DELETE /api/class/remove-subject/:classId`
- **Description:** Remove a subject from a class.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Request Body:**
  ```json
  {
    "subject": "Math" // Required: String
  }
  ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "classId",
      "subjects": ["Science"],
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "message": "Successfully subjects removed"
  }
  ```

### 8. Add Time Table to Class
- **Endpoint:** `PUT /api/class/add-time-table/:classId`
- **Description:** Add a time table entry to a class.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Request Body:**
  ```json
  {
    "day": "Monday", // Required: String
    "subject": "Math", // Required: String
    "startTime": "09:00", // Required: String
    "endTime": "10:00", // Required: String
    "teacherId": "teacherId" // Required: String (ObjectId)
  }
  ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "classId",
      "timeTable": [
        {
          "day": "Monday",
          "periods": [
            {
              "subject": "Math",
              "startTime": "09:00",
              "endTime": "10:00",
              "teacherId": "teacherId"
            }
          ]
        }
      ],
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "message": "Successfully added time slot to class"
  }
  ```

### 9. Remove Time Table Slot
- **Endpoint:** `DELETE /api/class/remove-time-day-period-slot/:classId`
- **Description:** Remove a time table slot from a class.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Request Body:**
  ```json
  {
    "periodId": "periodId" // Required: String (ObjectId)
  }
  ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "day": "Monday",
      "periods": [
        // Remaining periods after deletion
      ]
    },
    "message": "Successfully deleted time slot"
  }
  ```

### 10. Remove Time Slot Same Days
- **Endpoint:** `DELETE /api/class/remove-time-same-day-slot/:classId`
- **Description:** Remove a time slot for the same day.
- **Path Parameters:**
  - `classId`: Required, String (ObjectId)
- **Request Body:**
  ```json
  {
    "dayslotId": "dayslotId" // Required: String (ObjectId)
  }
  ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
  ```json
  {
    "status": 200,
    "data": {
      "_id": "classId",
      "timeTable": [
        // Remaining time slots after deletion
      ]
    },
    "message": "Remove day slot successfully"
  }
  ```

## Notes
- All date fields should be in the format `YYYY-MM-DD`.
- All time fields should be in the format `HH:MM`.
- Ensure to validate the input data before sending requests to the API.
