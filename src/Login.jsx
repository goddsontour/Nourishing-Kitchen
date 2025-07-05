function Login({ onLogin }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onLogin(true)}
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
