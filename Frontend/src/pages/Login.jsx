import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { message } from 'antd';
const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

     const response = await axios.post('https://feedback-form-5vjm.onrender.com/login', { username, password });
     sessionStorage.setItem("token",response.data.token)
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
