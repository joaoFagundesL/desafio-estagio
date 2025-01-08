document.addEventListener("DOMContentLoaded", () => {
  const postId = new URLSearchParams(window.location.search).get("id");

  const form = document.getElementById("post-form");

  if (postId) {
    fetchPostDetails(postId);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const currentDate = new Date().toISOString().split("T")[0];

    const postData = {
      title: title,
      body: description,
      publicationDate: currentDate,
    };

    if (postId) {
      updatePost(postId, postData);
    } else {
      createPost(postData);
    }
  });
});

function fetchPostDetails(postId) {
  fetch(`http://localhost:5050/api/v1/post/list/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success && data.postDetails) {
        document.getElementById("title").value = data.postDetails[0].title;
        document.getElementById("description").value = data.postDetails[0].body;
      } else {
        alert("Error fetching post details.");
      }
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
      alert("An error occurred while fetching the post details.");
    });
}

function updatePost(postId, postData) {
  fetch(`http://localhost:5050/api/v1/post/update/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Post updated successfully!");
        window.location.href = "index.html";
      } else {
        alert("Error updating post: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while updating the post.");
    });
}

function createPost(postData) {
  fetch("http://localhost:5050/api/v1/post/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Post created successfully!");
        window.location.href = "index.html";
      } else {
        alert("Error creating post: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while creating the post.");
    });
}
