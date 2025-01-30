// document.addEventListener("DOMContentLoaded", () => {
// let singleprodcard=document.getElementById("singleprodcard")
// singleprodcard.className="cardcontainer"
// let itemstorage=JSON.parse(localStorage.getItem("item"))
// singleprodcard.innerHTML=`<img src='${itemstorage.image}' alt='${itemstorage.id}' width="100%" height="250">
//          <p>${itemstorage.brand}</p>
//          <h4>${itemstorage.title}</h4>
//          <p>${itemstorage.original_price}</p>
//          <span class="button-container" id="add-to-cart-btn"> <button>Add to cart</button>
//          <button>BuyNow</button></span>`
//         singleprodcard.className="card"


// // Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    let singleprodcard = document.getElementById("singleprodcard");
    singleprodcard.className = "cardcontainer";
    let itemstorage = JSON.parse(localStorage.getItem("item"));
    singleprodcard.innerHTML = `
      <img src='${itemstorage.image}' alt='${itemstorage.id}' width="100%" height="250">
      <p>${itemstorage.brand}</p>
      <h4>${itemstorage.title}</h4>
      <p><strong>Price:</strong> ${itemstorage.original_price}</p>
      <span class="button-container" id="add-to-cart-btn">
        <button id="addtocart">Add to cart</button>
        <button id="buy">BuyNow</button>
      </span>
    `;
    singleprodcard.className = "card";
    const addToCartButton = document.getElementById("addtocart");
    const buyButton = document.getElementById("buy");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", (e) => {
        e.stopPropagation();
        Swal.fire({
          title: "Added to cart successfully!",
          icon: "success",
          draggable: true
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
        window.location.href = "../buynow/buynow.html"; // Redirect to the Buy Now page
      });
    } else {
      console.log("Buy Now button not found.");
    }
  });
  

  
        // document.querySelectorAll("#add-to-cart-btn").forEach(button => {
        //     button.addEventListener("click", (e) => {
        //         let item = {
        //             id: e.target.dataset.id,
        //             image: e.target.dataset.image,
        //             title: e.target.dataset.title,
        //             brand: e.target.dataset.brand,
        //             original_price: e.target.dataset.price
        //         };
        
        //         // Add the item to the cart and update the cart count
        //         addToCart(item);
        //     });
        // });
        