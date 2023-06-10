import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateDorm from './pages/CreateDorm';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage'
import Tries from './components/Tries'
import ResponsiveAppBar from './components/NavBar';
import Students from './pages/Students';
import Footer from './components/Footer';
import Dorm from './pages/Dorm';



// const MyComponent = styled('div')({   
//   height: "100vh",
//   color: 'darkslategray',  
//   backgroundColor: 'red',   
//   padding: 8,   
//   borderRadius: 4,
// });



function App() {
  return <div className='App'>

    <Router>
      <ResponsiveAppBar />

      <Routes>
        <Route path="/createDorm" element={<CreateDorm />} />
        <Route path="/" element={<Home />} />
        <Route path="/logIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Tries" element={<Tries />} />
        <Route path="/Students" element={<Students />} />
        <Route path="/dorm/:id" element={<Dorm />} />
      </Routes>

      <Footer />
    </Router>
  </div>;
}

export default App;
