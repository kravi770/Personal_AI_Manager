import './App.css';

//Components
import AddUser from './components/AddUser';
import NavBar from './components/NavBar';
// import RaviCRUD from './components/RaviCRUD';
import Login from './components/login';
import Allusers from './components/AllUsers';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditUser from './components/EditUser';
import Userpage from './components/userpage';
import RaviCRUD from './components/RaviCRUD';
import AdminPage from './components/adminpage';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<RaviCRUD />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/all" element={<Allusers />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/admin/edit/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<Userpage />} />
            <Route path="/admin/:id" element={<AdminPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
