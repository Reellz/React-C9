import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://newsfeed-strapi-1.onrender.com/api/posts/${id}?populate=*`
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        const p = data.data;

        const formattedPost = {
          id: p.documentId,
          title: p.Title,
          coverImage: p.Image?.formats?.small?.url || p.Image?.url || null,
          author: p.Author,
          content: p.Content,
          excerpt: p.Excerpt,
          category: p.Category,
        };

        setPost(formattedPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const renderContent = (content) => {
    if (!Array.isArray(content)) return null;
    return content.map((block, index) => {
      if (block.type === "paragraph") {
        return (
          <p key={index} className="mb-4 text-gray-300">
            {block.children.map((child) => child.text).join("")}
          </p>
        );
      }
      return null; // Add other block types if needed
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
          <p className="text-indigo-400 text-lg font-semibold animate-pulse">
            Loading post...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">⚠️</div>
          <p className="text-red-300 text-xl font-semibold animate-fadeIn">
            {error}
          </p>
        </div>
      </div>
    );

  if (!post) return <div className="text-gray-200">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg shadow-lg mt-10 text-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
      >
        ← Back
      </button>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
        />
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-indigo-300">
        {post.title}
      </h1>

      <div className="flex items-center justify-between text-gray-400 mb-4">
        <span>By {post.author || "Unknown"}</span>
        <span className="bg-blue-700 px-2 py-1 rounded text-sm">
          {post.category || "Uncategorized"}
        </span>
      </div>

      <p className="text-lg mb-6 text-gray-300">{post.excerpt}</p>

      <div className="prose prose-lg max-w-none">{renderContent(post.content)}</div>
    </div>
  );
}

export default SinglePost;
