import { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'goodfood') {
      localStorage.setItem('authenticated', 'true');
      onLogin(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <label className="block mb-2 text-sm font-bold text-gray-700">
        Enter password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </label>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
