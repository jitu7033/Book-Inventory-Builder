import WebSocket from 'ws';

// Replace with token you get from /__analytics/token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE3NjY2Mzg4MjEsImV4cCI6MTc2NjY4MjAyMX0.UzIqFFnUZ4BJNGqc7xm6au_nN0kdwinVOBA2rD9bTzM';
const ws = new WebSocket(`ws://localhost:4700?token=${token}`);

ws.on('open', () => {
    console.log('Connected to analytics WS');
});

ws.on('message', (msg) => {
    const log = JSON.parse(msg);
    console.log('LIVE LOG:', log);
});

ws.on('close', () => console.log('ws connection closed'));
ws.on('error', (err) => console.error('WS error:', err));
