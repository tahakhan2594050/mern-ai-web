// Test endpoint - Root level
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    return res.status(200).json({
        success: true,
        message: 'TEST ENDPOINT WORKING!',
        timestamp: new Date().toISOString(),
        method: req.method,
        status: 'CONNECTED',
        version: '3.0.0'
    });
}