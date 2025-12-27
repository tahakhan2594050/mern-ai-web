const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Basic middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? true : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints
app.get('/', (req, res) => {
    try {
        res.status(200).json({ 
            message: 'Server is Live!', 
            status: 'OK',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            version: '1.0.0'
        });
    } catch (error) {
        console.error('Error in root route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/health', (req, res) => {
    try {
        res.status(200).json({ 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    } catch (error) {
        console.error('Error in health route:', error);
        res.status(500).json({ error: 'Health check failed' });
    }
});

app.get('/api/test', (req, res) => {
    try {
        res.status(200).json({ 
            message: 'API is working', 
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            env: {
                nodeEnv: process.env.NODE_ENV,
                hasClerkKey: !!process.env.CLERK_SECRET_KEY,
                hasDbUrl: !!process.env.DATABASE_URL
            }
        });
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Test endpoint failed' });
    }
});

// Simple POST test
app.post('/api/test', (req, res) => {
    try {
        res.status(200).json({
            message: 'POST endpoint working',
            body: req.body,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in POST test:', error);
        res.status(500).json({ error: 'POST test failed' });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

// Only listen in development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;