const getStarRating = (rating) => {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "⭐" : "☆";
  }
  return stars;
};

document.addEventListener("DOMContentLoaded", () => {
  let singleprodcard = document.getElementById("singleprodcard");
  singleprodcard.className = "cardcontainer";
  let itemstorage = JSON.parse(localStorage.getItem("item"));
  singleprodcard.innerHTML = `
    <img src='${itemstorage.image}' alt='${itemstorage.id}' width="100%" height="250">
    <p>${itemstorage.brand}</p>
    <h4>${itemstorage.title}</h4>
    <p><strong>Price:</strong> ₹${itemstorage.original_price}</p>
    <p class="rating"><strong>Rating:</strong> <span class="rating-stars">${getStarRating(itemstorage.rating)}</span></p>
    <span class="button-container" id="add-to-cart-btn">
      <button id="addtocart">Add to cart</button>
      <button id="buy">Buy Now</button>
    </span>
  `;
  singleprodcard.className = "card";

  const addToCartButton = document.getElementById("addtocart");
  const buyButton = document.getElementById("buy");

  let cartAdded = false;

  if (addToCartButton) {
    addToCartButton.addEventListener("click", (e) => {
      e.stopPropagation();
      Swal.fire({
        title: "Added to cart successfully!",
        icon: "success",
        draggable: true
      }).then(() => {
        cartAdded = true;
      });
      const cartdata = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartdata.push(itemstorage);
      localStorage.setItem("cartItems", JSON.stringify(cartdata));
    });
  } else {
    console.log("Add to Cart button not found.");
  }

  if (buyButton) {
    buyButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cartAdded) {
        window.location.href = "../buynow/buynow.html";
      } else {
        Swal.fire({
          title: "Please add to cart first!",
          icon: "warning",
          draggable: true
        });
      }
    });
  } else {
    console.log("Buy Now button not found.");
  }
});

  function updateCartCount() {
    let allcartdata = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartCount = document.getElementById("cart-count");
    
    if (cartCount) {
        cartCount.textContent = allcartdata.length;
        
        // Hide the count if cart is empty
        cartCount.style.display = allcartdata.length > 0 ? "inline-block" : "none";
    }
  }
  
  // Call the function when the page loads
  updateCartCount();