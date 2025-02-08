// Initialize DOM elements
let cartitemscontainer = document.getElementById("cartitemscontainer");
let cartCount = document.getElementById("cart-count"); // Element to show cart count
let allcartdata = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update cart count
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = allcartdata.length;
    }
}

// Function to render cart items in table format
function renderCart() {
    const cartTableBody = document.getElementById("cartTableBody");
    cartTableBody.innerHTML = ""; // Clear existing rows

    allcartdata.forEach((x, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${x.image}" width="50" height="50" style="object-fit: cover;"></td>
            <td>${x.title}</td>
            <td>${x.brand}</td>
            <td>₹${x.original_price}</td>
            <td>
                <button class="qty-btn decrement" data-index="${index}">-</button>
                <span class="quantity">${x.quantity || 1}</span>
                <button class="qty-btn increment" data-index="${index}">+</button>
            </td>
            <td>₹${x.original_price * (x.quantity || 1)}</td>
            <td><button class="remove-btn" data-index="${index}">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    // Add quantity handlers
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('increment')) {
                allcartdata[index].quantity = (allcartdata[index].quantity || 1) + 1;
            } else {
                if (allcartdata[index].quantity > 1) {
                    allcartdata[index].quantity -= 1;
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(allcartdata));
            renderCart();
            updateOrderSummary();
        });
    });

    // Add remove handlers
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            allcartdata.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(allcartdata));
            renderCart();
            updateOrderSummary();
        });
    });

    updateCartCount();
}

// Function to update order summary
function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    let total = 0;

    if (orderItems) {
        orderItems.innerHTML = allcartdata.map(item => `
            <div class="order-item">
                <img src="${item.image}" width="50">
                <span>${item.title}</span>
                <span>Qty: ${item.quantity || 1}</span>
                <span>₹${item.original_price * (item.quantity || 1)}</span>
            </div>
        `).join('');

        total = allcartdata.reduce((acc, item) => acc + (item.original_price * (item.quantity || 1)), 0);
        const shipping = 50;
        document.getElementById('orderTotal').textContent = total;
        document.getElementById('grandTotal').textContent = total + shipping;
    }
}

// Handle checkout form submission
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (allcartdata.length === 0) {
            Swal.fire({
                title: "Your cart is empty!",
                text: "Please add some products before placing an order.",
                icon: "warning",
                draggable: true
            });
            return;
        }

        const orderDetails = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            items: allcartdata,
            total: document.getElementById('grandTotal').textContent,
            shippingDetails: {
                name: document.getElementById('fullName').value,
                address: document.getElementById('address').value
            },
            paymentMethod: document.getElementById('paymentMethod').value,
            date: new Date().toLocaleDateString()
        };

        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('cartItems');
        allcartdata = [];
        updateCartCount();

        // Show success alert and redirect
        Swal.fire({
            title: "Order Placed Successfully!",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = '../order-confirmation/order-confirmation.html?id=' + orderDetails.id;
        });
    });
}

// Initial render
renderCart();
updateOrderSummary();
