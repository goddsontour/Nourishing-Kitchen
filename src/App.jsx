import { useState, useEffect } from 'react';
import Login from './Login';
import RecipeEntry from './RecipeEntry';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('authenticated') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleRecipesChange = (updatedRecipes) => {
    setRecipes(updatedRecipes);
    console.log('Updated recipes:', updatedRecipes);
  };

  return isAuthenticated ? (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">You're logged in! Welcome to Kind Kitchen.</h2>
      <RecipeEntry onRecipesChange={handleRecipesChange} />
    </div>
  ) : (
    <Login onLogin={setIsAuthenticated} />
  );
}

export default App;

