import NewsCard from "../components/NewsCard";
import { useEffect, useState } from "react";

function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `https://newsfeed-strapi-1.onrender.com/api/posts?_page=${currentPage}`;
        if (searchQuery) {
          url += `&_q=${encodeURIComponent(searchQuery)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();

        const formattedPosts = data.data.map((post) => ({
          id: post.id,
          title: post.Title,
          coverImage: post.Image,
          author: post.Author,
          content: post.content,
          excerpt: post.Excerpt,
          category: post.Category,
        }));

        setPosts(formattedPosts);
        setTotalPages(data.meta?.pagination?.pageCount || 1);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinning loader */}
          <div className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>

          {/* Animated loading text */}
          <p className="text-indigo-400 text-lg font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
        <div className="text-center">
          {/* Error icon (animated shake) */}
          <div className="text-5xl mb-4 animate-bounce">⚠️</div>
          <p className="text-red-300 text-xl font-semibold animate-fadeIn">
            {error.message}
          </p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Feed</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full mb-6 p-2 border rounded"
      />

      {/* Posts list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <NewsCard
              key={post.id}
              id={post.id}
              coverImage={post.coverImage}
              title={post.title}
              author={post.author}
              content={post.content}
              excerpt={post.excerpt}
              category={post.category}
            />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NewsFeed;
