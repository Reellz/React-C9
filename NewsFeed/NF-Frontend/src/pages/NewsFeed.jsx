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

        // Map Strapi response to match NewsCard props
        const formattedPosts = data.data.map((post) => ({
          id: post.id,
          title: post.Title,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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