import recipeScraper from 'recipe-scraper';

// netlify/functions/fetchRecipe.js
export const handler = async (event) => {
  const url = event.queryStringParameters?.url;
  if (!url) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing url parameter' }),
    };
  }

  try {
    // Scrape recipe from the provided URL
    const data = await recipeScraper(url);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Error scraping recipe:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
