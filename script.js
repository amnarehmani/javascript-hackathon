const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

// Get elements
const postForm = document.getElementById('post-form');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const categorySelect = document.getElementById('category');
const blogList = document.getElementById('blog-list');

// Function to save posts to localStorage
function savePostToLocalStorage(post) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to render posts on the page
function renderPosts() {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  console.log(posts); // Check if posts are being retrieved from localStorage
  
  blogList.innerHTML = ''; // Clear previous posts
  
  posts.forEach(post => {
    const postElement = document.createElement('article');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p><strong>Category:</strong> ${post.category}</p>
      <p>${post.content}</p>
    `;
    blogList.appendChild(postElement);
  });
}

// Add event listener to the form submission
postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Ensure the form fields are not empty
  if (!postTitle.value || !postContent.value || !categorySelect.value) {
    alert('All fields must be filled out');
    return;
  }

  // Create post object
  const newPost = {
    title: postTitle.value,
    category: categorySelect.value,
    content: postContent.value
  };

  // Save post to localStorage
  savePostToLocalStorage(newPost);

  // Clear form fields
  postTitle.value = '';
  postContent.value = '';
  categorySelect.value = '';

  // Re-render posts
  renderPosts();
});

window.addEventListener('load', renderPosts);
