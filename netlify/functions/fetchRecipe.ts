import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const handler: Handler = async (event) => {
  const url = event.queryStringParameters?.url;
  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing URL parameter' }) };
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim();

    const ingredients: string[] = [];
    $('.wprm-recipe-ingredient').each((_, el) => {
      ingredients.push($(el).text().trim());
    });

    const method: string[] = [];
    $('.wprm-recipe-instruction-text').each((_, el) => {
      method.push($(el).text().trim());
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ title, ingredients, method }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch or parse recipe' }),
    };
  }
};

export { handler };
