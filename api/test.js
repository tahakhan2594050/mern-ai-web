// Simple test - CommonJS
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  res.status(200).json({
    message: 'Test endpoint working!',
    success: true,
    timestamp: new Date().toISOString()
  });
};