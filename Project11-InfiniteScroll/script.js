// Get ELEMENTS
// ============
const postsContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");

// Global Variables
// ================

let limit = 9;
let page = 1;

// FUNCTIONS
// =========

// getPosts() - API fetch
// ----------
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// showPosts()
// ----------
// 1. for each post create an element
// 2. Add Classes
// 3. Add HTML
// 4. Apend element to parent DOM

async function showPosts() {
  const posts = await getPosts();
  console.log(posts);

  posts.forEach((p) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${p.id}</div>
        <div class="post-info">
          <h2 class="post-title">${p.title}</h2>
          <p class="post-body">${p.body}</p>
        </div>
`;
    postsContainer.appendChild(postEl);
  });
}
showPosts();

// showLoading()
// -------------
// 1. Add the 'show' class to reveal loading bouncing balls
// 2. Remove 'show' class on timeout
// 3. load new page of posts from API
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");
  }, 1000);

  setTimeout(() => {
    page++;
    showPosts();
  }, 300);
}

// filterPosts()
// -------------
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((p) => {
    const title = p.querySelector(".post-title").innerText.toUpperCase();
    const body = p.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      p.style.display = "flex";
    } else {
      p.style.display = "none";
    }
  });
}

// EventListener - on the Window
// ============
// scrollHeight : Total Height of scroll material
// scrollTop : How much the client has scrolled down from top
// clientHeight : Height of viewport window
window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop - 5 <= clientHeight) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
