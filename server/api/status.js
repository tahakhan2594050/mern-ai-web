// Simple status endpoint for client testing
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        return res.status(200).json({
            success: true,
            message: 'Server is connected and working!',
            timestamp: new Date().toISOString(),
            status: 'online',
            version: '2.0.0',
            environment: process.env.NODE_ENV || 'production'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}