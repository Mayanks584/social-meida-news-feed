
const articles = require('../data/posts');

const PAGE_SIZE = 10; 

exports.getFeed = (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);

  const sorted = [...articles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const start = (page - 1) * PAGE_SIZE;
  const items = sorted.slice(start, start + PAGE_SIZE);

  res.json({
    page,
    totalArticles: articles.length,
    hasMore: start + PAGE_SIZE < sorted.length,
    articles: items
  });
};


exports.createArticle = (req, res) => {
  const { title, content, category, author } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Headline is required' });
  }
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Article content is required' });
  }
  if (!author || !author.trim()) {
    return res.status(400).json({ error: 'Author name is required' });
  }
  if (title.length > 120) {
    return res.status(400).json({ error: 'Headline cannot exceed 120 characters' });
  }
  if (content.length > 1000) {
    return res.status(400).json({ error: 'Article content cannot exceed 1000 characters' });
  }

  const validCategories = ['Technology', 'Sports', 'Education', 'Entertainment', 'Business', 'General'];
  const cat = (category && category.trim()) || 'General';

  const newArticle = {
    id: articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1,
    title: title.trim(),
    content: content.trim(),
    category: validCategories.includes(cat) ? cat : 'General',
    author: author.trim(),
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
};


exports.likeArticle = (req, res) => {
  const article = articles.find(a => a.id === Number(req.params.id));
  if (!article) return res.status(404).json({ error: 'Article not found' });

  article.likes += 1;
  res.json(article);
};

exports.addComment = (req, res) => {
  const article = articles.find(a => a.id === Number(req.params.id));
  if (!article) return res.status(404).json({ error: 'Article not found' });

  const { author, text } = req.body;
  if (!author || !author.trim() || !text || !text.trim()) {
    return res.status(400).json({ error: 'Name and comment text are required' });
  }

  article.comments.push({ author: author.trim(), text: text.trim() });
  res.status(201).json(article);
};
