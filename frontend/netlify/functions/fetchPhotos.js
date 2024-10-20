const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const albumId = event.queryStringParameters.albumId;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching photos' }),
    };
  }
};
