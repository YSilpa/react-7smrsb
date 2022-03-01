import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './Components/UserList';
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  

  return (
    <Router>  
    <div className="App">
      <Routes>
         <Route path="/" element={<Login setToken={setToken}/>} />
         <Route path="/list" element={<UserList token={token}/>} />
      </Routes>      
    </div>
    </Router>
  );
}

export default App;
