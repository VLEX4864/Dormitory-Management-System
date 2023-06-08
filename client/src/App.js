import './App.css';
import { BrowserRouter as Router, Link as RouterLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateDorm from './pages/CreateDorm';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage'
import Tries from './components/Tries'
import { Box, Link } from '@mui/material';
import ResponsiveAppBar from './components/NavBar';



// const MyComponent = styled('div')({   
//   height: "100vh",
//   color: 'darkslategray',  
//   backgroundColor: 'red',   
//   padding: 8,   
//   borderRadius: 4,
// });



function App() {
  return <div className='App'>

    <ResponsiveAppBar></ResponsiveAppBar>
    <Router>
      <Box sx={{ margin: '20px' }}>
        <Link variant="h6" underline="none" component={RouterLink} to="/createDorm">
          Create a dormitory
        </Link>
        <Link variant="h6" underline="none" component={RouterLink} to="/">
          Home
        </Link>
        <Link variant="h6" underline="none" component={RouterLink} to="/signUp">
          SignUp
        </Link>
        <Link variant="h6" underline="none" component={RouterLink} to="/logIn">
          LogIn
        </Link>
        <Link variant="h6" underline="none" component={RouterLink} to="/HomePage">
          HomePage
        </Link>
      </Box>

      <Routes>
        <Route path="/createDorm" element={<CreateDorm />} />
        <Route path="/" element={<Home />} />
        <Route path="/logIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Tries" element={<Tries />} />
      </Routes>
    </Router>
  </div>;
}

export default App;
