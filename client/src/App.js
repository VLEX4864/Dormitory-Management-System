import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateDorm from './pages/CreateDorm';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage'



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
      <Link to="/createDorm">Create a dormitory</Link>
      <Link to="/">Home page</Link>
      <Routes>
        <Route path="/createDorm" element={<CreateDorm/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
      </Routes>
    </Router>
  </div>;
}

export default App;
