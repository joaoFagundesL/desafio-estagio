document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
});

function fetchPosts() {
  fetch("http://localhost:5050/api/v1/post/list")
    .then((response) => response.json())
    .then((data) => {
      if (data.success && Array.isArray(data.data)) {
        renderPosts(data.data);
      } else {
        displayErrorMessage("No posts found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      displayErrorMessage("Error loading posts.");
    });
}

function renderPosts(posts) {
  const postsContainer = document.getElementById("post-details");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

function createPostElement(post) {
  const postStructureDiv = document.createElement("div");
  postStructureDiv.classList.add("post-structure");

  const imageTitleContainer = createImageTitleContainer(post);
  postStructureDiv.appendChild(imageTitleContainer);

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

  postStructureDiv.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = `post-details.html?id=${post.idBlog}`;
  });

  return postStructureDiv;
}

function createImageTitleContainer(post) {
  const imageTitleContainer = document.createElement("div");
  imageTitleContainer.classList.add("image-title-container");

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");

  const postTitle = document.createElement("h3");
  postTitle.textContent = post.title;
  titleContainer.appendChild(postTitle);
  imageTitleContainer.appendChild(titleContainer);

  const imageContainer = createImageContainer(post);
  imageTitleContainer.appendChild(imageContainer);

  return imageTitleContainer;
}

function createImageContainer(post) {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const deleteImage = createImageElement(
    "./images/delete.png",
    "Delete Post",
    "post-image-delete",
  );
  deleteImage.addEventListener("click", (event) => {
    event.stopPropagation();
    handleDeletePost(post.idBlog);
  });
  imageContainer.appendChild(deleteImage);

  const editImage = createImageElement(
    "./images/edit.png",
    "Edit Post",
    "post-image-edit",
  );
  editImage.addEventListener("click", (event) => {
    event.stopPropagation();
    handleEditPost(post.idBlog);
  });
  imageContainer.appendChild(editImage);

  return imageContainer;
}

function createImageElement(src, alt, className) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.classList.add(className);
  return img;
}

function handleDeletePost(postId) {
  console.log(`Delete post with ID: ${postId}`);
}

function handleEditPost(postId) {
  console.log(`Edit post with ID: ${postId}`);
}

function displayErrorMessage(message) {
  const postsContainer = document.getElementById("post-details");
  postsContainer.innerHTML = `<p>${message}</p>`;
}
