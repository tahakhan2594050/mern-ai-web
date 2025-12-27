import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints
app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is Live!', 
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString()
    });
});

app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'API is working', 
        timestamp: new Date().toISOString(),
        env: {
            hasClerkKey: !!process.env.CLERK_SECRET_KEY,
            hasDbUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV
        }
    });
});

// Simple API endpoints for testing
app.post('/api/ai/test', (req, res) => {
    res.json({ 
        message: 'AI endpoint working',
        body: req.body,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/user/test', (req, res) => {
    res.json({ 
        message: 'User endpoint working',
        timestamp: new Date().toISOString()
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message,
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

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;