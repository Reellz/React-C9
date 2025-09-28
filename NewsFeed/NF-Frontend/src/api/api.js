export async function fetchPosts(page, query) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/posts?_p=${page}&_q=${query}`
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
    const response = await fetch(`http://localhost:1337/api/posts/${id}`);
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
