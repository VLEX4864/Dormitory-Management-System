import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateDorm from './pages/CreateDorm';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Tries from './components/Tries'
import ResponsiveAppBar from './components/NavBar';
import AdminRegister from './pages/AdminRegister';
import Footer from './components/Footer';
import Dorm from './pages/Dorm';
import EditDormitory from './pages/EditDormitory';
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminTable from './pages/AdminTable';
import PageNotFound from './pages/PageNotFound';



function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    role: "",
  });

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      }
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: response.data.role,
          });
        }
      });
  }, [authState]);

  return <div className='App'>
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <ResponsiveAppBar />

        <Routes>
          <Route path="/createDorm" element={<CreateDorm />} />
          <Route path="/" element={<Home />} />
          <Route path="/logIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dorm/:id" element={<Dorm />} />
          <Route path="/Tries" element={<Tries />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />
          <Route path="/EditDormitory" element={<EditDormitory />} />
          <Route path="/AdminTable" element={<AdminTable />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </Router>
    </AuthContext.Provider>
  </div>;
}

export default App;
