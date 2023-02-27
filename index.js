"use strict";

const cards = document.querySelector(".cards");
const card = document.querySelector(".card");

// const getProducts = async function () {
//   const fetching = await fetch(
//     `https://dummyjson.com/products?limit=${10}&skip=${0}`
//   );

//   const data = await fetching.json();
//   const loopProduct = data.products.forEach((el) => {
//     console.log(el);
//     const html = `
//     <div class="card">
//     <div class="card_img">
//       <img
//         class="card_img_src"
//         src=${el.images[0]}
//         alt="photo"
//       />
//     </div>
//     <div class="card_text_content">
//       <p class="cardSmallText">${el.category}</p>
//       <h2 class="card_heading">${el.title}</h2>
//       <p class="card_Text">
//         ${el.description}
//       </p>
//       <span class="price">price: ${el.price}$</span>
//       <span class="rating"
//         >rating:
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star-half-stroke"></i>

//       </span>
//     </div>
//     <div class = "order_box"><button class="order_btn">ORDER NOW</button> </div>
//   </div>
//     `;
//     cards.insertAdjacentHTML("beforeend", html);
//   });
// };

// getProducts();
