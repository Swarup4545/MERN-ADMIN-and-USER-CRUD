import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, role } = await loginUser(email, password);
      localStorage.setItem('token', token);
      if (role === 'admin'){
        navigate('/admin/dashboard');
        console.log("Admin");

      }
      else{
        navigate('/user/dashboard')
        console.log(token,"USer")
      };
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-6">Login</h1>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2">Login</button>
      </form>
      <p className='text-semibold text-2xl text-center bg-red-200'>Don't Have an account?<Link to='/signup'><button
            className=" text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Signup
          </button></Link> </p>
      </div>
    </div>
  );
};

export default Login;
