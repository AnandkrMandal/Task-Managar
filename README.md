
# TaskSphere - The Task Manager Application

This project is a task manager web app built using **React** and **Vite** for the frontend, with a backend powered by **Node.js** and **Express**. The app allows users to create tasks, edit task, complete mark, and delete task with user login and signup feature.

---

## Features
- **Task Management**: Create, update, complete mark, delete tasks.
- **User**: user login and signup.

---

## Prerequisites

- **Node.js** (v14.x or higher)
- **npm** or **yarn** (latest versions)
- **MongoDB** (or any database for backend)
- **Git** (for version control)

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AnandkrMandal/Task-Managar.git
cd task-manager
```

### 2. Setup Backend

#### 2.1. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2.2. Backend Environment Variables

Create a `.env` file in the `backend` directory:

```
PORT=3000
MONGODB_URI=
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
```

#### 2.3. Run the Backend Server

```bash
npm run dev
```

The backend server will be running at `http://localhost:3000`.

### 3. Setup Frontend (React + Vite)

#### 3.1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 3.2. Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```
VITE_BACKEND_URL=http://localhost:3000
```

#### 3.3. Run the Frontend Development Server

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`.

---

## Project Structure

```bash
task-manager/
│
├── backend                   # Backend (Node.js + Express)
├── src/                     
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── controllers/          # Controller logic
│   ├── DBconfig/             # Configuration files (DB)
│   ├── app.js                # setup cros ,express, routing
│   └── index.js              # Entry point for backend  
│
└── frontend/                  # Frontend (React + Vite)
    ├── src/
    │   ├── components/        # React components
    │   ├── pages/             # Page views
    │   ├── store/             # redux store setup
    │   └── App.jsx            # App component
    │   └── main.jsx           # Main component
    ├── public/                # Public assets (images, etc.)
    └── 
```

---

## API Documentation

All API endpoints are prefixed with `/api/v1`.

### 1. **User Authentication**

#### POST `/api/v1/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### POST `/api/v1/login`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN"
  }
  ```

#### POST `/api/v1/change-password`
- **Description**:update existing user password.
- **Request Body**:
  ```json
  {
    "oldPassword": "password123",
    "newPassword": "password1234"
  }
  ```
- **Response**:
  ```json
  {
    "message": "password update successfully"

  }
  ```

#### POST `/api/v1/logout`
- **Description**: Logout an existing user.
- **Response**:
  ```json
  {
    "message": "Logout successful",
  }
 


### 2. **Task Management**

#### GET `/api/v1/tasks`
- **Description**: Get all tasks for the authenticated user.
- **Response**:
  ```json
  [
    {
      "_id": "taskId",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
    },
    {
      "_id": "taskId",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
    }
  ]
  ```

#### GET `/api/v1/tasks/:id`
- **Description**: Get task by id for the authenticated user.
- **Response**:
  ```json
    [
    {
      "_id": "taskId",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
    }
    ]
  
  ```

#### POST `/api/v1/tasks`
- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "Task title",
    "description": "Task description",
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task created successfully",
    "task": {
      "_id": "taskId",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
      "user": "userId"
    }
  }
  ```

#### PATCH `/api/v1/tasks/:id`
- **Description**: Update an existing task.
- **Request Body** (example):
  ```json
  {
    "title": "Updated task title",
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "_id": "taskId",
      "title": "Updated task title",
      "description": "Task description",
      "completed": false,
      "User": "userId"
    }
  }
  ```

#### PATCH `/api/v1/tasks/:id/complete`
- **Description**: Update complete  an existing task.

- **Response**:
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "_id": "taskId",
      "title": "Updated task title",
      "description": "Task description",
      "completed": true,
      "User": "userId"
    }
  }
  ```


#### DELETE `/api/v1/tasks/:id`
- **Description**: Delete a task.
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
---
## POSTMAN

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/33073079-1d9c96f0-bd42-410c-a98a-4587b7168bb8?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D33073079-1d9c96f0-bd42-410c-a98a-4587b7168bb8%26entityType%3Dcollection%26workspaceId%3D1868490c-4dd2-456e-bbb1-8b179978ebe9)


---

## Frontend Features

- **React + Vite** for fast, modern frontend development.
- **React Router** for page navigation.
- **Tailwind CSS** for styling.
- **State Management** (React redux) for managing app state.
- **Axios** for making API calls to the backend.

---


## Deployment

For production deployment, you can build the frontend and backend separately.

### Backend

```bash
cd backend
npm run start
```

### Frontend

```bash
cd frontend
npm run build
```
---

## Live Link

```bash


```
### default email and password for login

email:anand@gmail.com

password:12345

## Thankyou


### creator: Anand kumar Mandal
### emailto:anandkumarjsr8821@gmail.com