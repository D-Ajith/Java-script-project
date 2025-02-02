document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);

    if (order) {
        // Display order details
        document.getElementById('orderId').textContent = order.id;
        document.getElementById('confirmationTotal').textContent = order.total;

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        document.getElementById('deliveryDate').textContent = 
            deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        document.getElementById('orderItemsConfirmation').innerHTML = order.items.map(item => `
            <div class="confirmation-item">
                <img src="${item.image}" width="40">
                <span>${item.title} (Qty: ${item.quantity || 1})</span>
            </div>
        `).join('');
    } else {
        // Display "Order Not Found" message
        document.getElementById('confirmationDetails').innerHTML = `
            <h2>Order Not Found</h2>
            <p>Sorry, the order details could not be retrieved.</p>
        `;
    }

    // Add event listener to the "Continue Shopping" button
    const continueShoppingButton = document.getElementById('continueShopping');
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', () => {
            // Trigger SweetAlert2 popup
            Swal.fire({
                title: "Thank you for shopping!",
                text: "We appreciate your visit. Feel free to continue shopping.",
                icon: "success",
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    // After the user clicks "OK" in SweetAlert, redirect to homepage
                    window.location.href = '../navbar/index.html'; // Redirect to homepage
                }
            });
        });
    }
});