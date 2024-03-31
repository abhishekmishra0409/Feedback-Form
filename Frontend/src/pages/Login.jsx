import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { message } from 'antd';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
     await axios.post('http://localhost:3000/login', { username, password });
      // console.log(response.data.message);
      navigate(`/admin`);
      message.success("Login Successfully")
    } catch (error) {
      message.error('Invalid Username or Password!');
    }
  };

  return (
      <>
        <div className='container'>
          <form className='l-div' onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">
              Login
            </button>
          </form>
        </div>
      </>
  );
};

export default Login;
