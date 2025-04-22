let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    const cartCountElements = document.querySelectorAll('.cart-count');

    // Update cart count
    cartCountElements.forEach(element => {
        element.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    });

    if (cart.length === 0) {
        cartEmpty.classList.remove('d-none');
        cartItems.classList.add('d-none');
        cartSummary.classList.add('d-none');
        return;
    }

    cartEmpty.classList.add('d-none');
    cartItems.classList.remove('d-none');
    cartSummary.classList.remove('d-none');

    // Clear existing items
    cartItems.innerHTML = '';

    // Update cart item display with dark theme
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'card mb-3 bg-dark text-light border-light';
        itemElement.innerHTML = `
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded shadow" alt="${item.name}">
                    </div>
                    <div class="col-md-4">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-success">${item.price}</p>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group">
                            <button class="btn btn-outline-light" onclick="updateQuantity(${index}, -1)">-</button>
                            <input type="number" class="form-control bg-dark text-light text-center" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-light" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <p class="h5 mb-0 text-success">${item.price}</p>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    updateTotals();
}

function updateTotals() {
    const subtotal = cart.reduce((total, item) => {
        const price = parseInt(item.price.replace('₹', ''));
        return total + (price * item.quantity);
    }, 0);

    const shipping = cart.length > 0 ? 50 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('total').textContent = `₹${total}`;
}

function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', updateCartDisplay);