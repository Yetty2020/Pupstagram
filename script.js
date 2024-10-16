const mainContainer = document.getElementById("img-container");

const likeButton = document.getElementById("like-button");
const commentButton = document.getElementById("comment-button");
const post = document.getElementById("post");


async function fetchDogByValue() {
  try {
    const searchElement = document.getElementById("search-element");
    const value = searchElement.value;
    const url = `https://dog.ceo/api/breed/${value}/images/random`;
    const response = await fetch(url);
    const data = await response.json();
    mainContainer.innerHTML = "";

    displayer(data.message);
  } catch (error) {
    console.log(error);
  }
}

async function fetchRandomData() {
  try {
    let url = `https://dog.ceo/api/breeds/image/random`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
   

    displayer(data.message);
  } catch (error) {
    console.log(error);
  }
}

async function loopDogs() {
  const Array_of_results = [];
  for (let i = 0; i < 7; i++) {
    Array_of_results.push(fetch("https://dog.ceo/api/breeds/image/random"));
  }
  try {
    const responses = await Promise.all(Array_of_results);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    console.log(data);
    data.forEach((item) => {
      displayer(item.message);
    });
  } catch (error) {
    console.log(error);
  }
}

const displayer = (imgUrl) => {
  const commentSection = () => {
    let commentDiv = card.querySelector('.comment-section');
    if (!commentDiv) {
      commentDiv = document.createElement("div");
      commentDiv.className = "comment-section";
      

      const commentList = document.createElement("ul");
      commentList.className = "comment-list";
      // commentList.style.display = "flex";
      // commentList.style.flexDirection = "column";
      // commentList.style.listStyle = "none";
      // commentList.style.padding = "0";
      // commentList.style.margin = "0 0 10px 0";
      // commentList.style.overflowX = "auto";

      const inputPostContainer = document.createElement("div");
      inputPostContainer.style.display = "flex";
    
      const inputPost = document.createElement("input");
      const postButton = document.createElement("button");
      postButton.textContent = "post";

      inputPostContainer.appendChild(inputPost);
      inputPostContainer.appendChild(postButton);

      commentDiv.appendChild(commentList);
      commentDiv.appendChild(inputPostContainer);
    
      card.appendChild(commentDiv);

      postButton.addEventListener("click", () => postAction(inputPost, commentList));
    }
  
    commentDiv.style.display = commentDiv.style.display === "none" ? "flex" : "none";
  };  
  
  const postAction = (inputPost, commentList) => {
    const text = inputPost.value;
    if (text.trim() !== "") {
      const dateTime = new Date().toLocaleString();
      const newComment = document.createElement("li");
      newComment.innerHTML = `user 001: ${text} (${dateTime})`;
      commentList.appendChild(newComment);
      inputPost.value = ''; // Clear the input after posting
    }
  };  
  
  const toggleLike = () => {
    if (likeBtn.innerHTML.includes("far fa-heart")) {
      likeBtn.innerHTML = `<i class="fas fa-heart" aria-hidden="true" id="full-heart"></i>`;
    } else {
      likeBtn.innerHTML = `<i class="far fa-heart" aria-hidden="true" id="empty-heart"></i>`;
    }
  };

  const img = document.createElement("img");
  img.src = imgUrl;

  const card = document.createElement("div");

  const buttonsDiv = document.createElement("div");
  const likeBtn = document.createElement("button");

  likeBtn.innerHTML = `<i class="far fa-heart" aria-hidden="true" id="empty-heart"></i>`;
  likeBtn.addEventListener("click", toggleLike);
  const commentBtn = document.createElement("button");
  commentBtn.innerHTML = `<i class="fa fa-comment" aria-hidden="true"></i>`;
  commentBtn.addEventListener("click", commentSection);

  buttonsDiv.appendChild(likeBtn);
  buttonsDiv.appendChild(commentBtn);
  card.appendChild(img);
  card.appendChild(buttonsDiv);
  
  mainContainer.prepend(card);
};

document.querySelector(".btn").addEventListener("click", fetchRandomData);
document
  .getElementById("search-button")
  .addEventListener("click", fetchDogByValue);
//
// commentButton.addEventListener("click", commentSection);
// post.addEventListener("click", postAction);

loopDogs();
