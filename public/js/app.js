
const feed        = document.getElementById('feed');
const articleForm = document.getElementById('articleForm');
const loadMoreBtn = document.getElementById('loadMore');

let currentPage = 1; 
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


const categoryColors = {
  Technology: '#0ea5e9',
  Sports: '#22c55e',
  Education: '#a855f7',
  Entertainment: '#f59e0b',
  Business: '#ef4444',
  General: '#6b7280'
};


function renderArticle(a) {
  const badgeColor = categoryColors[a.category] || categoryColors.General;

  const comments = a.comments
    .map(c => `<div class="comment"><b>${escapeHtml(c.author)}</b>${escapeHtml(c.text)}</div>`)
    .join('');

  return `
    <div class="card article-card" id="article-${a.id}">
      <span class="category-badge" style="background:${badgeColor};">${escapeHtml(a.category)}</span>
      <h3 class="article-title">${escapeHtml(a.title)}</h3>
      <div class="article-meta">
        <span class="article-author">✍️ ${escapeHtml(a.author)}</span>
        <span class="article-time">${new Date(a.createdAt).toLocaleString()}</span>
      </div>
      <p class="article-content">${escapeHtml(a.content)}</p>

      <div class="actions">
        <button class="secondary" onclick="likeArticle(${a.id})">👍 Like (${a.likes})</button>
      </div>

      <div class="comments">
        ${comments}
        <div class="comment-form">
          <input type="text" id="cname-${a.id}" placeholder="Name" style="max-width:100px;" />
          <input type="text" id="ctext-${a.id}" placeholder="Write a comment..." />
          <button onclick="addComment(${a.id})">Send</button>
        </div>
      </div>
    </div>
  `;
}


async function loadFeed(page = 1) {
  const res = await fetch(`/api/articles?page=${page}`);
  const data = await res.json();

  const html = data.articles.map(renderArticle).join('');

  if (page === 1) {
    feed.innerHTML = html;       
  } else {
    feed.innerHTML += html;       
  }

  currentPage = page;
  loadMoreBtn.style.display = data.hasMore ? 'block' : 'none';
}


articleForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = {
    title:    document.getElementById('title').value,
    content:  document.getElementById('content').value,
    category: document.getElementById('category').value,
    author:   document.getElementById('author').value
  };

  const res = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    loadFeed(1);                 
  } else {
    const data = await res.json();
    alert(data.error);
  }
});


async function likeArticle(id) {
  const res = await fetch(`/api/articles/${id}/like`, { method: 'POST' });
  const article = await res.json();
  document.getElementById(`article-${id}`).outerHTML = renderArticle(article);
}


async function addComment(id) {
  const body = {
    author: document.getElementById(`cname-${id}`).value,
    text:   document.getElementById(`ctext-${id}`).value
  };

  const res = await fetch(`/api/articles/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (res.ok) {
    document.getElementById(`article-${id}`).outerHTML = renderArticle(data);
  } else {
    alert(data.error);
  }
}


loadMoreBtn.addEventListener('click', () => loadFeed(currentPage + 1));

loadFeed(1);
