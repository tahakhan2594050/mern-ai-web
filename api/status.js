// Status endpoint - Root level
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
        status: 'HEALTHY',
        message: 'Server is running perfectly!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '3.0.0',
        environment: process.env.NODE_ENV || 'production'
    });
}