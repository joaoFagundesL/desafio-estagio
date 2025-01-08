const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

fetch(`http://localhost:5050/api/v1/post/list/${postId}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.success && data.postDetails) {
      const post = data.postDetails[0];
      const postDetailContainer = document.getElementById(
        "post-detail-container",
      );

      const postContent = `
            <h2 class="post-detail-title">${post.title}</h2>
            <span class="post-detail-published">Published on: ${new Date(post.publicationDate).toLocaleDateString()}</span>
            <p class="post-detail-description">${post.body || "No content available"}</p>
          `;
      postDetailContainer.innerHTML = postContent;
    } else {
      document.getElementById("post-detail-container").innerHTML =
        "<p>Post not found.</p>";
    }
  })
  .catch((error) => {
    console.error("Error fetching the post:", error);
    document.getElementById("post-detail-container").innerHTML =
      "<p>Error loading post.</p>";
  });
