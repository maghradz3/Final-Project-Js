"use strict";

const cards = document.querySelector(".cards");
const cardDetail = document.querySelector(".cardDetail");
const mainCard = document.querySelector(".main_card");
// const card = document.querySelector(".card");
const card = document.getElementsByClassName("card");
const nav_item = document.querySelector(".nav_item");
const nav = document.querySelector(".nav");
const order_box = document.getElementsByClassName(".order_box");
const header = document.querySelector(".header");
const pagination = document.querySelector(".pagination");

///details
const detailCard = document.querySelector(".detailCard");
// const returnBtn = document.querySelector(".returnBtn");
//Functions

////////Modal window ///////////////////////////
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

console.log(btnsOpenModal);
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////Menu fade animation////////////////////
const handleHover = function (e) {
  if (e.target.classList.contains("nav_item")) {
    const hoverd = e.target;
    const siblings = hoverd.closest(".header").querySelectorAll(".nav_item");
    const logo = hoverd.closest(".header").querySelector(".logo-img");
    const logIn = hoverd.closest(".header").querySelector(".fade");

    siblings.forEach((el) => {
      if (el !== hoverd) el.style.opacity = this;
    });
    logo.style.opacity = this;

    logIn.style.opacity = this;
  }
};
// class="order_btn">ORDER NOW</button> </div>
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

////////////////footer social icons ////////////////////
const socIcons = document.querySelector(".socIcons");
const icons = document.querySelectorAll(".icons");
const fa_brands = document.querySelectorAll("fa_brands");
const facebook = document.querySelector(".facebook");
const fa_facebook = document.querySelector(".fa-facebook-f");
const instagram = document.querySelector(".instagram");
const fa_instagram = document.querySelector(".fa-instagram");
const twitter = document.querySelector(".twitter");
const fa_twitter = document.querySelector(".fa-twitter");
console.log(icons);

const socIconsFunc = (smallName, bigName, scale, color) => {
  smallName.style.transform = scale;
  bigName.style.color = color;
  bigName.style.transform = scale;
};

icons.forEach((el) => {
  el.addEventListener("mouseover", function (e) {
    const hoverTarget = e.target.closest(".icons");

    if (hoverTarget.classList.contains("facebook")) {
      socIconsFunc(facebook, fa_facebook, "scale(1.1", "#4F46E5");
    }
    if (hoverTarget.classList.contains("instagram")) {
      socIconsFunc(instagram, fa_instagram, "scale(1.1)", "red");
    }
    if (hoverTarget.classList.contains("twitter")) {
      socIconsFunc(twitter, fa_twitter, "scale(1.1)", "#4F46E5");
    }
  });
  el.addEventListener("mouseout", function (e) {
    const hoverTarget = e.target.closest(".icons");

    if (hoverTarget.classList.contains("facebook")) {
      socIconsFunc(facebook, fa_facebook, "scale(1)", "black");
    }
    if (hoverTarget.classList.contains("instagram")) {
      socIconsFunc(instagram, fa_instagram, "scale(1)", "black");
    }
    if (hoverTarget.classList.contains("twitter")) {
      socIconsFunc(twitter, fa_twitter, "scale(1)", "black");
    }
  });
});

////////////////Reveal sections /////////////////////////

const allSection = document.querySelectorAll(".part");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  // console.log(entry.target);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSection.forEach((part) => {
  sectionObserver.observe(part);
  part.classList.add("section--hidden");
});
///////////////////////fetching html function//////////////
const apiUrl = `https://dummyjson.com/products`;
// let skip = 0;
const productsPerPage = 12;
let totalPosts = 100;
let currentPages = 1;
let posts = [];

const getTotalProducts = async function () {
  try {
    const response = await fetch(`https://dummyjson.com/products`);

    const json = await response.json();
    const totalProducts = json.total;

    return totalProducts;
  } catch (error) {
    console.error(`error fetching total products:`, error);
  }
};
getTotalProducts();

// const start = (currentPage - 1) * postLimit;
// const end = start + postLimit;
// let loadPorducts;
const getProducts = async function () {
  const skip = (currentPages - 1) * productsPerPage;
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
    );
    if (response.ok) {
      const json = await response.json();
      const data = json.products;
      posts = data;
      cards.innerHTML = "";

      posts.forEach((product) => {
        const card = document.createElement("div");

        card.classList.add("card");

        //img Content
        const card_img = document.createElement("div");
        card_img.classList.add("card_img");
        card.append(card_img);

        const img_src = document.createElement("img");
        img_src.src = `${product.images[0]}`;
        img_src.classList.add("card_img_scr");
        card_img.appendChild(img_src);

        const title = document.createElement("h1");
        title.classList.add("card_heading");
        title.textContent = `${product.title}`;
        card.appendChild(title);
        const category = document.createElement("h2");
        category.classList.add("category");
        category.textContent = `  ${product.category}`;
        card.appendChild(category);
        const description = document.createElement("p");
        description.classList.add("card_Text");
        description.textContent = ` 📓: ${product.description}`;
        card.appendChild(description);

        //Price

        const price = document.createElement("span");
        price.classList.add("highlited_span");
        price.textContent = `💲price: ${product.price} $ `;
        card.appendChild(price);

        // const detailBtnContainer = document.createElement("div");

        // detailBtnContainer.classList.add("order_box");

        const detail = document.createElement("button");
        detail.textContent = `Detail`;
        detail.classList.add("order_btn");
        card.appendChild(detail);
        cards.appendChild(card);
        detail.addEventListener("click", function () {
          const detailEndpoint = `https://dummyjson.com/products/${product.id}`;

          fetchDetail(detailEndpoint);
        });
      });
    }
  } catch (error) {
    console.error(`error fetching mobile products:`, error);
  }
  // const
};

async function fetchDetail(detailEndpoint) {
  try {
    const response = await fetch(detailEndpoint);
    const detailData = await response.json();
    console.log(detailData);

    const s1coords = header.getBoundingClientRect();
    window.scrollTo({
      left: s1coords.left + window.pageXOffset,
      top: s1coords.top + window.pageYOffset,
      behavior: "smooth",
    });
    pagination.classList.add("hidden");

    cards.style.display = "none";
    detailCard.classList.remove("hidden");

    let detailHtml = `
    <h1 class="detailTitle">${detailData.title}</h1>
    <p class="detailDescription">${detailData.description}</p>
    <div class="detailImg--0">
      <img class "detailImg" src="${detailData.images[0]}" alt="">
    </div>
    <p class="detailDescription2">${detailData.description}</p>

      <div class="detailImages">
        <div class="detailImgCont">
        <img class=" detailImg" src="${detailData.images[1]}" alt="">
      </div>
      <div class='detailImgCont'>
        <img class="detailImg"  src="${detailData.images[2]}" alt="">
      </div>
      </div>
      <p class='detailDescription2'>${detailData.description}</p>
  </div>
  
    `;
    const returnBtn = document.createElement("button");

    detailCard.innerHTML = detailHtml;
    returnBtn.classList.add("returnBtn");
    returnBtn.textContent = `Back to main Page`;
    detailCard.appendChild(returnBtn);
    returnBtn.addEventListener("click", function (e) {
      cards.style.display = "flex";
      const s1coords = header.getBoundingClientRect();
      window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: "smooth",
      });

      detailCard.classList.add("hidden");
      pagination.classList.remove("hidden");
    });

    //create a new page to display detailed informationhn
  } catch (error) {
    console.error(`Error fetching product detail:`, error);
  }
}

const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", function () {
  if (currentPages > 1) {
    currentPages--;
    const s1coords = header.getBoundingClientRect();
    window.scrollTo({
      left: s1coords.left + window.pageXOffset,
      top: s1coords.top + window.pageYOffset,
      behavior: "smooth",
    });
    updatePagination();
    getProducts();
  }
});

const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", function () {
  const totalPages = Math.ceil(totalPosts / productsPerPage);
  if (currentPages < totalPages) {
    currentPages++;
    const s1coords = header.getBoundingClientRect();
    window.scrollTo({
      left: s1coords.left + window.pageXOffset,
      top: s1coords.top + window.pageYOffset,
      behavior: "smooth",
    });
    updatePagination();
    getProducts();
  }
});

const pageBtns = document.querySelectorAll(".page");
pageBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    currentPages = Number(btn.dataset.tab);
    const s1coords = header.getBoundingClientRect();
    window.scrollTo({
      left: s1coords.left + window.pageXOffset,
      top: s1coords.top + window.pageYOffset,
      behavior: "smooth",
    });
    updatePagination();
    getProducts();
  });
});

const updatePagination = function () {
  pageBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (Number(btn.dataset.tab) === currentPages) {
      btn.classList.add("active");
    }
  });

  if (currentPages === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  const totalPages = Math.ceil(totalPosts / productsPerPage);
  if (currentPages === totalPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
};

getProducts();
updatePagination();

const enterMail = document.querySelector(".enterMail");

const inputBtn = document.querySelector(".inputBtn");

inputBtn.addEventListener("click", function (e) {
  const email = enterMail.value;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(email)) {
    alert("Email is valid! thanks");
  } else {
    alert("Please enter a valid email adress");
  }
});

// nav Bar

const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
  // hamburger.textContent = "X";
  const nav = document.querySelector(".nav");
  nav.classList.toggle("active");
});
