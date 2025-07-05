// src/utils/recipes.js
// Helper function to call the Netlify function for fetching recipes

/**
 * Fetches a recipe from the serverless function.
 * @param {string} url - The URL of the recipe to scrape.
 * @returns {Promise<{ title: string; ingredients: string[]; method: string[] }>} 
 */
export async function fetchRecipeFromUrl(url) {
  const endpoint = `/.netlify/functions/fetchRecipe?url=${encodeURIComponent(url)}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server error: ${text}`);
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return {
    title: data.title,
    ingredients: data.ingredients,
    method: data.method,
  };
}
