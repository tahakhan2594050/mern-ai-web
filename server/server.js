import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Basic middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? true // Allow all origins in production for now
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints (no auth required)
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

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working', timestamp: new Date().toISOString() });
});

// Initialize services function
async function initializeServices() {
    try {
        const connectCloudinary = (await import('./configs/cloudinary.js')).default;
        await connectCloudinary();
        console.log('Cloudinary initialized');
    } catch (error) {
        console.error('Failed to initialize services:', error);
    }
}

// Routes with proper error handling
app.use('/api/ai', async (req, res, next) => {
    try {
        // Initialize services if not already done
        await initializeServices();
        
        const { clerkMiddleware } = await import('@clerk/express');
        const aiRouter = (await import('./routes/aiRoutes.js')).default;
        
        // Apply Clerk middleware first
        clerkMiddleware()(req, res, (err) => {
            if (err) {
                console.error('Clerk middleware error:', err);
                return res.status(401).json({ error: 'Authentication failed' });
            }
            // Then apply the router
            aiRouter(req, res, next);
        });
    } catch (error) {
        console.error('Error in AI routes:', error);
        res.status(500).json({ error: 'Failed to load AI routes', details: error.message });
    }
});

app.use('/api/user', async (req, res, next) => {
    try {
        const { clerkMiddleware } = await import('@clerk/express');
        const userRouter = (await import('./routes/userRoutes.js')).default;
        
        clerkMiddleware()(req, res, (err) => {
            if (err) {
                console.error('Clerk middleware error:', err);
                return res.status(401).json({ error: 'Authentication failed' });
            }
            userRouter(req, res, next);
        });
    } catch (error) {
        console.error('Error in user routes:', error);
        res.status(500).json({ error: 'Failed to load user routes', details: error.message });
    }
});

app.use('/api/admin', async (req, res, next) => {
    try {
        const { clerkMiddleware } = await import('@clerk/express');
        const adminRouter = (await import('./routes/adminRoutes.js')).default;
        
        clerkMiddleware()(req, res, (err) => {
            if (err) {
                console.error('Clerk middleware error:', err);
                return res.status(401).json({ error: 'Authentication failed' });
            }
            adminRouter(req, res, next);
        });
    } catch (error) {
        console.error('Error in admin routes:', error);
        res.status(500).json({ error: 'Failed to load admin routes', details: error.message });
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

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;