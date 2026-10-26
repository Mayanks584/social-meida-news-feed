
const express = require('express');
const path = require('path');

const articleRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 3000;

// Middleware: lets Express read JSON sent from the frontend
app.use(express.json());

// Serve the frontend (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'News feed server is running' });
});

// All article related routes start with /api/articles
app.use('/api/articles', articleRoutes);

// Handle unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
