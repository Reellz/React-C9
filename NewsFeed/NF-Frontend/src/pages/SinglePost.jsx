import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api/api"; // Your api.js

function SinglePost() {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error loading post: {error.message}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">By {post.author}</p>
      <div className="prose">{post.content}</div>
    </div>
  );
}

export default SinglePost;