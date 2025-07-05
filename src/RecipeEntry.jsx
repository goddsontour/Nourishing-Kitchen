import { useState } from 'react';

export default function RecipeEntry({ onRecipesChange }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const titleMatch = text.match(/^.*$/m);
    const ingredientsMatch = text.match(/(?<=Ingredients:)[\s\S]*?(?=Method:)/i);
    const methodMatch = text.match(/(?<=Method:)[\s\S]*/i);

    const recipe = {
      title: titleMatch?.[0]?.trim() || 'Untitled Recipe',
      ingredients: ingredientsMatch?.[0]?.trim().split('\n').filter(Boolean) || [],
      method: methodMatch?.[0]?.trim() || '',
    };

    onRecipesChange((prev) => [...prev, recipe]);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-48 p-2 border border-gray-300 rounded"
        placeholder="Paste your recipe here..."
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add Recipe
      </button>
    </form>
  );
}
