import { Routes, Route, Navigate } from 'react-router-dom';
import NewsFeed from './pages/NewsFeed';
import SinglePost from './pages/SinglePost';

function App() {
  return (
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/news" />} />

        {/* News Feed Page */}
        <Route path="/news" element={<NewsFeed />} />

        {/* Single Post Page */}
        <Route path="/news/:id" element={<SinglePost />} />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/news" />} />
      </Routes>
  );
}

export default App;