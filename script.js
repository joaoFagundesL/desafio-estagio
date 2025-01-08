document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5050/api/v1/post/list") // Endpoint to get all posts
    .then((response) => response.json())
    .then((data) => {
      const postsContainer = document.getElementById("post-details");

      if (data.success && Array.isArray(data.data)) {
        data.data.forEach((post) => {
          const postStructureDiv = document.createElement("div");
          postStructureDiv.classList.add("post-structure");

          const postTitle = document.createElement("h3");
          postTitle.textContent = post.title;
          postStructureDiv.appendChild(postTitle);

          const postDate = document.createElement("span");
          postDate.textContent = `Published on: ${new Date(post.publicationDate).toLocaleDateString()}`;
          postStructureDiv.appendChild(postDate);

          const postDescription = document.createElement("span");
          const truncatedDescription =
            post.body && post.body.length > 60
              ? `${post.body.slice(0, 60)}...`
              : post.body || "No description available";
          postDescription.textContent = truncatedDescription;
          postStructureDiv.appendChild(postDescription);

          postsContainer.appendChild(postStructureDiv);

          postStructureDiv.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = `post-details.html?id=${post.idBlog}`;
          });
        });
      } else {
        console.error("Error: Posts not found or invalid format");
        postsContainer.innerHTML = "<p>No posts found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      document.getElementById("post-details").innerHTML =
        "<p>Error loading posts.</p>";
    });
});
