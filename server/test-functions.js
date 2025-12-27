// Test the serverless functions locally
import handler from './api/index.js';

// Mock request and response objects
const mockReq = {
    method: 'GET',
    url: '/',
    headers: {}
};

const mockRes = {
    setHeader: (key, value) => console.log(`Header: ${key} = ${value}`),
    status: (code) => {
        console.log(`Status: ${code}`);
        return {
            json: (data) => console.log('Response:', JSON.stringify(data, null, 2)),
            end: () => console.log('Response ended')
        };
    }
};

console.log('Testing serverless function...');
handler(mockReq, mockRes);