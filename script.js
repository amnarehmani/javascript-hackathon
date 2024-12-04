let submit = document.querySelector(".submit");
let notesElem = document.querySelector('.notes');
let title = document.querySelector("#title");
let desc = document.querySelector('#desc');
let category = document.querySelector('#category');

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
if (blogs.length) {
    blogs.forEach(blog => addBlog(blog));
}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    addBlog();
});

function addBlog(blogObj) {
    let card = document.createElement("div");
    card.classList.add("card");

    let titleVal = title.value;
    let descVal = desc.value;
    let categoryVal = category.value;

    if (blogObj) {
        titleVal = blogObj.title;
        descVal = blogObj.desc;
        categoryVal = blogObj.category;
    }

    if (titleVal && descVal) {
        card.innerHTML = `
            <h3>${titleVal}</h3>
            <p class="ptag">${descVal}</p>
            <p><strong>Category:</strong> ${categoryVal}</p>
            <button class="del">Delete</button>`;
        notesElem.appendChild(card);
        updateLocalStorage();
    }

    let del = card.querySelector(".del");
    del.addEventListener('click', () => {
        card.remove();
        updateLocalStorage();
    });
}

function updateLocalStorage() {
    let cards = document.querySelectorAll(".card");
    let blogArr = [];
    cards.forEach(card => {
        blogArr.push({
            title: card.children[0].innerText,
            desc: card.children[1].innerText,
            category: card.children[2].innerText.split(": ")[1]
        });
    });
    localStorage.setItem("blogs", JSON.stringify(blogArr));
}
