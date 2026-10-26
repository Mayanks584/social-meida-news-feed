
const articles = [
  {
    id: 1,
    title: 'Express.js 5.0 Released with Major Performance Boost',
    content: 'The Express.js team announced version 5.0 featuring faster routing, built-in async error handling, and improved TypeScript support. This is great news for backend developers.',
    category: 'Technology',
    author: 'Amit Sharma',
    likes: 12,
    comments: [{ author: 'Simran', text: 'Great news for Node.js developers!' }],
    createdAt: '2026-10-25T09:00:00.000Z'
  },
  {
    id: 2,
    title: 'India Wins T20 Series Against Australia 3-1',
    content: 'Team India sealed the T20 series with a dominant 45-run victory in the fourth match. Captain Suryakumar Yadav was named Player of the Series.',
    category: 'Sports',
    author: 'Rahul Verma',
    likes: 25,
    comments: [],
    createdAt: '2026-10-25T14:30:00.000Z'
  },
  {
    id: 3,
    title: 'AKTU Announces New Semester Exam Schedule for 2026',
    content: 'AKTU has released the revised exam schedule for odd semester exams. Students can download their admit cards from the official website starting November 1.',
    category: 'Education',
    author: 'Priya Singh',
    likes: 8,
    comments: [{ author: 'Rahul', text: 'Finally some clarity on dates!' }],
    createdAt: '2026-10-26T08:15:00.000Z'
  }
];

module.exports = articles;
