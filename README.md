# Ecommerce-Follow-Along


A backend-focused e-commerce application built to explore and demonstrate modern web development techniques, including RESTful APIs, database management, and authentication.

## 🚀 Features
- **User Authentication and Authorization (JWT-based)**: Secure login and token management.
- **Product Management (CRUD operations)**: Ability to add, update, delete, and view products.
- **Cart and Order Management**: Users can add products to their cart and place orders.
- **Payment Integration (Stripe/PayPal)**: Seamless payment options for processing transactions.
- **Secure and Scalable Architecture**: Designed for performance and growth.
- **Integrated Error Handling and Validation**: Ensures clean and reliable APIs.
- **Database Implementation**: Uses MongoDB/MySQL for efficient data storage.


## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB / MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe / PayPal
- **Dev Tools**: Postman, Git, Docker (optional)

- 

## Milestone 2: Frontend - Login Page

In this milestone, I focused on creating the frontend for the login page. I structured the application by setting up a `components` folder where I created the `Login.jsx` component. Additionally, I organized the layout by creating a `pages` folder, which includes `Home.jsx`, `Login.jsx`, and `Navbar.jsx` components. These components work together to provide a seamless user experience, with a functional and visually clean login page for the e-commerce platform.


## Setup and Installation

To get started with the project locally:

### 1. Clone the repository




### mile stone 2
In Milestone 2, we've moved the e-commerce application to the next level. Having completed Milestone 1, we have focused on structuring the project, setting up both the frontend and backend environments, and building the first user-facing feature – the Login Page. In this milestone, we ensure the project is structured and organized for what features will come in.

Learning Goals ????
We have for the end of this milestone

Implemented project file organisation, making sure everything is organized and in place in the project
Set up a React frontend app to do the UI layout
Configured a Node.js server for our backend, that will be prepared for API handling
Integrated Tailwind CSS and used utility classes to make things easier with respect to styling classes.
Developed a functional/styled Login page for the front end, thereby ensuring a smoothen experience for the end user.
Feature Implemented????️
- +1.Project Folder Structure.
frontend: Holds all files relating to React.
backend: Has the Node.js server and subsequent API files
- +2. Setup of React Frontend
Activated the frontend by using React to create dynamic UIs
Installed dependencies like React Router for routing
- +3. Setup of Node.js Backend
Activated a minimal Node.js server with Express for subsequent API requests
- +4. Tailwind CSS Setup
Activated Tailwind CSS to make styling of the applications look a lot cleaner and more modern in nature and response.
Installed PostCSS for maximum comfort with developing using Tailwind CSS.
- +5. Building Login Page
Logged-in Page has been designed as the initial functionality of the e-commerce platform.
It was made using Tailwind CSS so it has an incredibly clean design with modern style
Basic fields included were Email, Password fields with a submit button.
Has potential to implement new functionalities (in this case authentication).







# mile stone 3
In Milestone 3, we have actually taken the following big step on our e-commerce application. This is the stage where we would set up a backend, make it talk with a MongoDB, and handle potential errors, as we had set up our frontend in earlier milestones. Now, this stage will ensure your application has good grounds to build on with your backend supporting any API requests made and data managing.

Learning Outcomes???
What we have for ourselves by completing this milestone include:

Organized the backend code into dedicated folders for a better structure and scalability.
Set up a Node.js server using Express to deal with API requests.
Connected to MongoDB for managing data efficiently.
Implemented basic error handling to smooth out server operations.
Updated the README for our achievement in this milestone.
Key Features Implemented????️
- +1. Backend Folder Structure
We have set up a well-structured folder for the organization of different parts of the backend.
routes : Different API endpoints and their routes
controllers : Contains the business logic of the routes
models : Defines the models used in MongoDB
middleware : Every middleware function, including authentication and validation, goes inside this folder.
utils : Utility folder with miscellaneous utilities utility functions in the app.
- +2. Configuring the Server
The Node.js server was generated by using Express and was setup to listen at a different port.
API routes for the application in order to handle different kinds of requests types like GET, POST, PUT, DELETE
- +3. Database Connection
I included MongoDB to hold data such as products, users, and orders
Connected Node.js server using Mongoose with the MongoDB database for managing information.
Confirmed that the backend server is correctly connected with the MongoDB database.
- +4. Error Handling
Put in some elementary error handling which, in the event of some errors with the API calls returns meaningful messages to users and developers to debug from easily.



# Milestone 4: User Model, Controller and File Uploads

## Summary
This milestone is to create a **User Model** for ordered data, to build out the **User Controllers** for the proper CRUD operations, and finally, add in **Multer** for file uploads. The backend should now have user management with the ability to upload images.

---
End

## Features Implemented

### 1. User Model

- **Schema Fields**
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required)
- `profileImage` (String, upload path of the image)
- `createdAt` & `updatedAt` (Timestamps)
It makes use of Mongoose for schema validation and indexing.

### 2. User Controller
- **Methods**:
- `createUser`: It creates a new user with error checking.
- `getAllUsers`: Fetch all users from the database.
- `getUserById`: It fetches a single user by ID and throws an error if it is invalid.
- `updateUser`: Updates user details and his profile image.
 
### 3. Multer File Uploads
- **Config**:
- Store all uploads in the `uploads/` folder
- Only accept `image/jpeg` and `image/png`
- Limit size to 5MB
- **Route**: `POST /users/:id/upload` for profile pic upload

-----

## Technical Details

### Database

- **MongoDB**: NoSQL. It's dynamic information a user will have.
- **Mongoose**: Schema modeling, query building, etc.

### Multer Setup
```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/,
filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
```

const upload = multer({
storage
limits: { fileSize: 5 * 1024 * 1024 }, // 5MB

fileFilter: (req, file, cb) =>
if (file.mimetype.startsWith('image/')) cb(null, true); else cb(new Error('Only images are allowed!'), false);


# MileStone 5

- +builted the Sign-Up Page: by  Creating the UI using HTML & CSS.

# Milestone 6 - User Signup with Secure Data Storage

### Description
In this milestone, we’ve focused on implementing the backend endpoint for the signup page. The key objective was to ensure that user data, especially passwords, are securely stored in the database. By using **bcrypt** for password hashing, we are ensuring that passwords are encrypted before storing them, following best security practices.

### Features Implemented in Milestone 6:
- **Password Encryption:** The user’s password is hashed using bcrypt before storing it in the database.
- **Secure User Data Storage:** User details (name, email, etc.) are securely stored in the database, ensuring that sensitive information like passwords are never saved as plain text.
  

# Milestone 7 

### Description
In this milestone, we implemented the backend login functionality, which accepts user credentials (email/username and password), hashes the entered password using bcrypt, and compares it with the stored hashed password to validate the user's identity.


# Milestone 8

### Description 

In this milestone, we focused on developing a reusable Product Card Component and designed the homepage layout to display multiple product card dynamically.


- +Features Implemented:

- +Reusable Product Card Component: Displays product image, name, and price.

- +Dynamic Data Handling: Passed product details via props to ensure reusability.

- +Homepage Grid Layout: Used Flexbox/Grid for a structured and visually appealing product listing.

- +Array Mapping for Dynamic Rendering: Implemented mapping to iterate over product lists and render cards dynamically.

- +Consistent UI Design: Ensured uniform styling for all products




# Milestone 9 - Product Input Form  

## Overview  
In this milestone, we created a frontend form to take product details as input, including multiple images.  

## Features  
- Form to input product details  
- Supports multiple image uploads  
- Prepares data for future database storage  

## Submission  
Code is pushed to GitHub and publicly accessible.  
