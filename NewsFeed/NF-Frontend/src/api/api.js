export async function fetchPosts(page, query) {
  try {
    const response = await fetch(
      `https://newsfeed-strapi-1.onrender.com/api/posts?_p=${page}&_q=${query}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchPostById(id) {
  try {
    const response = await fetch(`https://newsfeed-strapi-1.onrender.com/api/posts/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
