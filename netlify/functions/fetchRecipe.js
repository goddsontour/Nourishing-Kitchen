// netlify/functions/fetchRecipe.js
// Netlify Edge Runtime or Node 18+ with built-in fetch
// This function scrapes recipe data via JSON-LD or falls back to simple HTML parsing

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  };
  …
};
