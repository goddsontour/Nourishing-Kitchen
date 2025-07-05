import { useState } from 'react';
import RecipeEntry from './RecipeEntry';
import { fetchRecipeFromUrl } from './utils/recipes';

export default function App() {
  // Bypassing login for testing
  const [recipes, setRecipes] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchClick = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    try {
      const recipe = await fetchRecipeFromUrl(url);
      setRecipes(prev => [...prev, recipe]);
      setUrl('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipesChange = updatedRecipes => {
    setRecipes(updatedRecipes);
  };

  const renderMethod = method => {
    let steps = [];
    if (Array.isArray(method)) {
      steps = method;
    } else if (typeof method === 'string') {
      steps = method.split(/\r?\n/).filter(Boolean);
    }
    return (
      <ol className="list-decimal list-inside">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    );
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Welcome to Kind Kitchen</h2>

      {/* URL fetch form */}
      <div className="mb-4 flex space-x-2">
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter recipe URL…"
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleFetchClick}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Fetching…' : 'Fetch Recipe'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Paste-in form */}
      <RecipeEntry onRecipesChange={handleRecipesChange} />

      {/* Render all recipes */}
      <div className="mt-6 space-y-4">
        {recipes.map((r, i) => (
          <div key={i} className="p-4 border rounded">
            <h3 className="font-bold text-lg">{r.title}</h3>
            <h4 className="mt-2 font-semibold">Ingredients</h4>
            <ul className="list-disc list-inside">
              {r.ingredients.map((ing, j) => (
                <li key={j}>{ing}</li>
              ))}
            </ul>
            <h4 className="mt-2 font-semibold">Method</h4>
            {renderMethod(r.method)}
          </div>
        ))}
      </div>
    </div>
  );
}
