
const express = require('express');
const path = require('path');

const articleRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'News feed server is running' });
});


app.use('/api/articles', articleRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
