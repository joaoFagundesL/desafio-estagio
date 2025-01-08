document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("post-form");

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

    createPost(postData);
  });
});

function createPost(postData) {
  console.log(postData);
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
