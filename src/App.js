import React from 'react';
import './App.css';
import Login from './Components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './Components/UserList';
function setToken(userToken) {
  sessionStorage.setItem('token', userToken);
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString;
}

function App() {
  const token = getToken();
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Login getToken={getToken} setToken={setToken} />}
          />
          <Route path="/dashboard" element={<UserList getToken={getToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
