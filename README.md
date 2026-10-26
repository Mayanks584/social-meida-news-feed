# 📰 News Feed App

A **minimal news feed application** built with **Express.js** (backend) and **HTML/CSS/JavaScript** (frontend).  
Users can publish news articles, like them, and add comments — all through a RESTful API.

---

## 📁 Project Structure

```
news-feed-app/
│
├── server.js                  # 🚀 Entry point — starts the Express server on port 3000
│
├── routes/
│   └── postRoutes.js          # 🛣️  Defines all URL routes (maps URLs → controller functions)
│
├── controllers/
│   └── postController.js      # 🧠 Business logic — handles what happens for each route
│
├── data/
│   └── posts.js               # 💾 In-memory database (array of article objects)
│
├── public/                    # 🌐 Frontend (served as static files by Express)
│   ├── index.html             #    Main HTML page
│   ├── css/
│   │   └── style.css          #    Styling
│   └── js/
│       └── app.js             #    Frontend JavaScript (calls backend APIs using fetch)
│
├── package.json               # 📦 Project metadata and dependencies
├── .gitignore                 # 🚫 Files to ignore in git (node_modules)
└── README.md                  # 📖 This file
```

---

## 🏗️ Architecture — How the App Works

```
┌──────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Client)                           │
│                                                                      │
│  index.html  ──loads──>  app.js  ──calls──>  fetch('/api/articles') │
│                                                                      │
│  User fills article form → clicks "Publish" → app.js sends POST    │
│  User clicks "Like"     → app.js sends POST request                │
│  User writes comment    → clicks "Send" → app.js sends POST        │
└──────────────────────┬───────────────────────────────────────────────┘
                       │  HTTP Request (JSON)
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                       EXPRESS SERVER (Backend)                       │
│                                                                      │
│  server.js                                                           │
│    ├── express.json()          → Parses incoming JSON body           │
│    ├── express.static('public') → Serves HTML/CSS/JS files          │
│    ├── /api/health             → Health check route                  │
│    └── /api/articles           → Forwards to postRoutes.js          │
│                                                                      │
│  postRoutes.js                                                       │
│    ├── GET  /api/articles              → controller.getFeed         │
│    ├── POST /api/articles              → controller.createArticle   │
│    ├── POST /api/articles/:id/like     → controller.likeArticle     │
│    └── POST /api/articles/:id/comments → controller.addComment      │
│                                                                      │
│  postController.js                                                   │
│    └── Reads/writes data in ──> data/posts.js (in-memory array)     │
└──────────────────────────────────────────────────────────────────────┘
```

### Step-by-step Flow (Example: Publishing an Article)

```
1. User fills in headline, category, author, content → clicks "Publish Article"
2. Frontend (app.js) sends:
      POST /api/articles
      Body: { "title": "...", "content": "...", "category": "Technology", "author": "Ishu" }
3. Express receives request → matches route in postRoutes.js
4. postRoutes.js calls → controller.createArticle()
5. Controller validates input → creates article object → pushes to articles array
6. Controller sends response: 201 Created + new article JSON
7. Frontend receives response → reloads feed → new article appears on top
```

---

## 🔌 API Endpoints (All Details)

Base URL: `http://localhost:3000`

---

### 1️⃣ Health Check

| Field     | Value                              |
|-----------|------------------------------------|
| **URL**   | `GET /api/health`                  |
| **Purpose** | Check if the server is running   |

**Request:**
```
GET http://localhost:3000/api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "News feed server is running"
}
```

---

### 2️⃣ Get Feed (All Articles)

| Field     | Value                                      |
|-----------|--------------------------------------------|
| **URL**   | `GET /api/articles?page=1`                 |
| **Purpose** | Fetch paginated articles (5 per page, newest first) |

**Request:**
```
GET http://localhost:3000/api/articles?page=1
```

**Response (200 OK):**
```json
{
  "page": 1,
  "totalArticles": 3,
  "hasMore": false,
  "articles": [
    {
      "id": 3,
      "title": "AKTU Announces New Semester Exam Schedule for 2026",
      "content": "AKTU has released the revised exam schedule...",
      "category": "Education",
      "author": "Priya Singh",
      "likes": 8,
      "comments": [{ "author": "Rahul", "text": "Finally some clarity on dates!" }],
      "createdAt": "2026-10-26T08:15:00.000Z"
    },
    {
      "id": 2,
      "title": "India Wins T20 Series Against Australia 3-1",
      "content": "Team India sealed the T20 series with a dominant 45-run victory...",
      "category": "Sports",
      "author": "Rahul Verma",
      "likes": 25,
      "comments": [],
      "createdAt": "2026-10-25T14:30:00.000Z"
    }
  ]
}
```

**How pagination works:**
- `page=1` → Articles 1–5, `page=2` → Articles 6–10, etc.
- `hasMore: true` means more pages are available.
- Articles are sorted **newest first** by `createdAt`.

---

### 3️⃣ Publish a New Article

| Field     | Value                                           |
|-----------|-------------------------------------------------|
| **URL**   | `POST /api/articles`                            |
| **Purpose** | Publish a new article to the feed             |
| **Body**  | JSON with `title`, `content`, `category`, `author` |

**Request:**
```
POST http://localhost:3000/api/articles
Content-Type: application/json

{
  "title": "Node.js 22 Released with New Features",
  "content": "Node.js 22 brings improved performance and new built-in utilities.",
  "category": "Technology",
  "author": "Ishu"
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "title": "Node.js 22 Released with New Features",
  "content": "Node.js 22 brings improved performance and new built-in utilities.",
  "category": "Technology",
  "author": "Ishu",
  "likes": 0,
  "comments": [],
  "createdAt": "2026-10-26T12:00:00.000Z"
}
```

**Validation rules:**
- `title` — required, max 120 characters
- `content` — required, max 1000 characters
- `author` — required
- `category` — optional (defaults to "General"). Valid values: Technology, Sports, Education, Entertainment, Business, General

**Error Responses (400 Bad Request):**
```json
{ "error": "Headline is required" }
```
```json
{ "error": "Article content is required" }
```
```json
{ "error": "Headline cannot exceed 120 characters" }
```

---

### 4️⃣ Like an Article

| Field     | Value                              |
|-----------|------------------------------------|
| **URL**   | `POST /api/articles/:id/like`      |
| **Purpose** | Increment the like count by 1    |

**Request:**
```
POST http://localhost:3000/api/articles/1/like
```
(No body needed)

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Express.js 5.0 Released with Major Performance Boost",
  "content": "The Express.js team announced version 5.0...",
  "category": "Technology",
  "author": "Amit Sharma",
  "likes": 13,
  "comments": [{ "author": "Simran", "text": "Great news for Node.js developers!" }],
  "createdAt": "2026-10-25T09:00:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{ "error": "Article not found" }
```

---

### 5️⃣ Add a Comment

| Field     | Value                                  |
|-----------|----------------------------------------|
| **URL**   | `POST /api/articles/:id/comments`      |
| **Purpose** | Add a comment to a specific article  |
| **Body**  | JSON with `author` and `text`          |

**Request:**
```
POST http://localhost:3000/api/articles/2/comments
Content-Type: application/json

{
  "author": "Ishu",
  "text": "What a match! India played brilliantly."
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "title": "India Wins T20 Series Against Australia 3-1",
  "content": "Team India sealed the T20 series...",
  "category": "Sports",
  "author": "Rahul Verma",
  "likes": 25,
  "comments": [
    { "author": "Ishu", "text": "What a match! India played brilliantly." }
  ],
  "createdAt": "2026-10-25T14:30:00.000Z"
}
```

**Error Response (400 Bad Request):**
```json
{ "error": "Name and comment text are required" }
```

---

## 🧪 How to Test APIs (using curl)

```bash
# Health check
curl http://localhost:3000/api/health

# Get feed (page 1)
curl http://localhost:3000/api/articles?page=1

# Publish a new article
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Article","content":"This is a test.","category":"Technology","author":"Ishu"}'

# Like an article (id = 1)
curl -X POST http://localhost:3000/api/articles/1/like

# Add a comment to article (id = 1)
curl -X POST http://localhost:3000/api/articles/1/comments \
  -H "Content-Type: application/json" \
  -d '{"author":"Ishu","text":"Nice article!"}'
```

---

## 🔄 Request–Response Lifecycle

```
Client Request
     │
     ▼
┌─────────────────────────────────────────────────────┐
│ 1. express.json() middleware                        │
│    → Parses the JSON body from the request          │
│    → Makes it available as req.body                 │
├─────────────────────────────────────────────────────┤
│ 2. express.static('public') middleware              │
│    → If URL matches a file in /public, serve it     │
│    → e.g., GET / → serves index.html                │
├─────────────────────────────────────────────────────┤
│ 3. Route matching                                   │
│    → Express checks each app.use() / app.get()      │
│    → Finds matching route in postRoutes.js          │
├─────────────────────────────────────────────────────┤
│ 4. Controller function                              │
│    → Runs the business logic                        │
│    → Reads/writes data from articles array          │
│    → Sends JSON response back (res.json())          │
├─────────────────────────────────────────────────────┤
│ 5. 404 handler (if no route matched)                │
│    → Returns { error: "Route not found" }           │
└─────────────────────────────────────────────────────┘
     │
     ▼
Client receives JSON response
```

---

## 📊 Data Model (Article Object)

Each article stored in `data/posts.js` looks like:

```javascript
{
  id: 1,                                    // Unique ID (auto-incremented)
  title: "Express.js 5.0 Released...",      // Article headline (max 120 chars)
  content: "The Express.js team...",        // Article body (max 1000 chars)
  category: "Technology",                   // Category (Technology/Sports/Education/etc.)
  author: "Amit Sharma",                    // Author name
  likes: 12,                               // Number of likes
  comments: [                              // Array of comment objects
    { author: "Simran", text: "Great!" }
  ],
  createdAt: "2026-10-25T09:00:00.000Z"    // ISO timestamp
}
```

> **Note:** This is an **in-memory** database. All data resets when the server restarts.  
> In production, you would replace this with **MongoDB** or **MySQL**.

---

## 🚀 How to Run

```bash
# 1. Install dependencies (only needed once)
npm install

# 2. Start the server
npm start

# 3. Open in browser
# Visit: http://localhost:3000
```

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Runtime    | Node.js v20             |
| Framework  | Express.js v4           |
| Frontend   | HTML5, CSS3, Vanilla JS |
| Database   | In-memory (JS array)    |
| API Format | RESTful JSON            |

---

## ✅ Features Summary

| Feature           | API Endpoint                      | HTTP Method | Description                          |
|-------------------|-----------------------------------|-------------|--------------------------------------|
| Health Check      | `/api/health`                     | GET         | Check if server is running           |
| Get Feed          | `/api/articles?page=1`            | GET         | Fetch articles (paginated, newest first)|
| Publish Article   | `/api/articles`                   | POST        | Add a new article to the feed        |
| Like Article      | `/api/articles/:id/like`          | POST        | Increment like count on an article   |
| Add Comment       | `/api/articles/:id/comments`      | POST        | Add a comment to an article          |
| Serve Frontend    | `/` (static files)                | GET         | Serves index.html, CSS, JS          |
