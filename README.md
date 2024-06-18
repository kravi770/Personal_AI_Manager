# Personal_ChatBOT ( MERN Stack Learning Project )

This is a Full Stack web application built using MongoDB, Express, Node.js, and React.js. It is designed for managing user details (accessible to admin) through Create, Read, Update, and Delete (CRUD) operations. When users create and login into account, they will be directed to a userpage. It contains an input text box which takes input and pass it to chatGPT and fetch response from there. Also users have the option to edit and delete their account info by clicking on profile button.

## Features
 ### Admin
- View User 
- Delete User 
- Edit User
 ### User
- Search and get response from chatGPT API
- Edit account info
- Delete their account
- Logout from current account

## Technologies Used
- Frontend:
  - React.js
  - Material-UI (for built-in components)
- Backend:
  - Node.js with Express.js
  - Axios
- Database:
  - MongoDB

## Project Structure

The project is structured as follows:

- `client/`: Contains all frontend code using React.js, api and Material-UI.
  - `public/`: This holds all of our static files.
  - `build/`: This contains a unique hash of all the files and contents, used for deployment only.
  - `src/`: 
    - `components/`: Includes individual UI components like Navbar, Tabs, Editing Page, Admin Page and User Page.
    - `service/`: Handles API requests to the backend.
    - `App.js`: This renders all of our browser routes and other services.
    - `index.js`: This renders the react app by rendering App.js
  
- `server/`: Contains the backend logic using Node.js with Express.js.
  - `controller/`: Contains functions to handle API requests from the frontend.
  - `database/`: Connects the backend to the MongoDB database.
  - `Routes/`: Contains API routes requested from the frontend.
  - `Schema/`: Defines the data model for users.
    
- `.gitignore`: Specifies file names to git to ignore it.
- `package.json`: Defines npm behaviors like the scripts.
- `README`: This file !


