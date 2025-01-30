// let cartitemscontainer=document.getElementById("cartitemscontainer")
// cartitemscontainer.className="cardcontainer"
// let allcartdata=JSON.parse(localStorage.getItem("cartItems"))
//     allcartdata.forEach(x=>{
//          let card=document.createElement("div")
//          card.innerHTML=`<img src='${x.image}' alt='${x.id}' width="100%" height="250">
//          <p>${x.brand}</p>
//          <h4>${x.title}</h4>
//          <p>${x.original_price}</p>
//          <span class="button-container"> <button id="rm">Remove</button>
//          <button>BuyNow</button></span>`
//          card.className="card"
//          cartitemscontainer.append(card)

//          card.querySelector("#rm").addEventListener("click",()=>{
//             cartitemscontainer.removeChild(card)
//             console.log("Number of items in cart after removal:", allcartdata.length - 1);
//          })
//     })

let cartitemscontainer = document.getElementById("cartitemscontainer");
cartitemscontainer.className = "cardcontainer";

let cartCount = document.getElementById("cart-count"); // Element to show cart count

// Get cart data from localStorage
let allcartdata = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update cart count
function updateCartCount() {
    cartCount.textContent = allcartdata.length;
}

// Function to render cart items
function renderCart() {
    cartitemscontainer.innerHTML = ""; // Clear previous items

    allcartdata.forEach((x, index) => {
        let card = document.createElement("div");
        card.innerHTML = `
            <img src="${x.image}" alt="${x.id}" width="100%" height="250">
            <p>${x.brand}</p>
            <h4>${x.title}</h4>
            <p>${x.original_price}</p>
            <span class="button-container">
                <button class="remove-btn" data-index="${index}">Remove</button>
                <button>Buy Now</button>
            </span>`;
        
        card.className = "card";
        cartitemscontainer.append(card);
    });

    // Attach event listeners after rendering all items
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            let itemIndex = parseInt(e.target.dataset.index); // Get item index

            // Remove only the selected item
            allcartdata.splice(itemIndex, 1);

            // Update localStorage
            localStorage.setItem("cartItems", JSON.stringify(allcartdata));

            // Re-render the cart
            renderCart();
        });
    });

    updateCartCount(); // Update count after re-render
}

// Initial render
renderCart();
