// Ultra-simple Vercel function - CommonJS
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({
    message: 'API is working!',
    success: true,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
};