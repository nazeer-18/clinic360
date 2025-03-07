# Clinic 360 - MERN Stack Application

## Live Deployment Links
- **Frontend**: [Clinic 360](https://arogo-clinic-360.netlify.app/)
- **Backend**: [API Server](https://arogoai-clinic360-hegi.onrender.com) *(Note: Free tier server, may take 1-2 minutes to load.)*

This project is developed as part of the Arogo AI Internship Assessment. It is a full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing clinic appointments. The platform allows patients to book and manage appointments and doctors to manage their availability.

## Folder Structure
- **clinic-backend**: Contains the backend code (Node.js, Express, MongoDB).
- **clinic-frontend**: Contains the frontend code (Vite + React + Tailwind CSS).

## Cloning and Forking the Repository

### Clone the Repository
```bash
git clone https://github.com/nazeer-18/clinic360.git
cd clinic360
```

### Forking the Repository
1. Go to the [GitHub repository](https://github.com/nazeer-18/clinic360).
2. Click on the **Fork** button in the top-right corner.
3. Clone your forked repository:
```bash
git clone https://github.com/nazeer-18/clinic360.git
cd clinic360
```

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (local or cloud-based like MongoDB Atlas)
- npm or yarn

### Backend Setup
```bash
cd clinic-backend
npm install
npm start  # Runs on default port 5000
```

### Frontend Setup
```bash
cd clinic-frontend
npm install
npm run dev  # Runs on default port 5173
```

### Environment Variables
Create a `.env` file in the `clinic-backend` directory with the following values:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER= your-email
SMTP_PASS= generate a password from google app passwords
```
Create a `.env` file in the `clinic-frontend` directory with the following values:
```
VITE_BACKEND_URL = http://localhost:5000/
```

## API Usage Guide

### Authentication (Patients & Doctors)
#### Register (POST `/api/auth/register`) 
![image](https://github.com/user-attachments/assets/4e6cdb6e-ce79-4180-a086-75d9c0aee4bf)

#### Login (POST `/api/auth/login`)
![image](https://github.com/user-attachments/assets/b4468ab9-1018-4a8c-a1eb-6cfbe0f94534)


### Appointments
#### Book Appointment (POST `/api/appointments/book-appointment`)
![image](https://github.com/user-attachments/assets/b676eaee-6bcf-4318-a236-8ed0f2fafc4f)

#### View Appointments (GET `/api/appointments/get-appointments/?id=yourid`)
![image](https://github.com/user-attachments/assets/1bd4da0b-9ada-4669-8f57-a6abfc116d52)


#### Cancel Appointment (POST `/api/appointments/cancel-appointment?id=yourid`)
![image](https://github.com/user-attachments/assets/ed2d2c6d-01ff-4d63-99f5-3afac30d2eb2)


### Doctors
#### Get Doctors (GET `/api/doctor/doctor-profile/?id=yourid`)
![image](https://github.com/user-attachments/assets/25ea433f-b2a5-471a-84cd-408681177283)


#### Search Doctors (POST `/api/doctor/search-doctor`)
![image](https://github.com/user-attachments/assets/fb9b82aa-6e12-4126-b36a-2fd297c593b6)


## License
This project is licensed under the MIT License.

## Contact
For any queries, reach out to the project maintainers.
