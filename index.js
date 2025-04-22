// Initialize cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Search functionality
document.querySelector('form[role="search"]').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector('input[type="search"]').value.toLowerCase();
    
    // Simple search through product cards
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

// Add hover effects
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    // Filter functionality
    const filterButtons = document.querySelectorAll('[data-category]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            filterProducts(category);
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortProducts');
    sortSelect.addEventListener('change', () => {
        const category = document.querySelector('[data-category].active').dataset.category;
        filterProducts(category);
    });

    // Back to top functionality
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Filter products function
    function filterProducts(category) {
        const productSections = document.querySelectorAll('.product-section');
        const sortValue = document.getElementById('sortProducts').value;

        productSections.forEach(section => {
            if (category === 'all' || section.dataset.category === category) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        // Apply sorting if needed
        if (sortValue !== 'default') {
            sortProducts(sortValue);
        }
    }

    // Sort products function
    function sortProducts(sortType) {
        const visibleSections = Array.from(document.querySelectorAll('.product-section:not(.hidden)'));
        
        visibleSections.forEach(section => {
            const cards = Array.from(section.querySelectorAll('.card'));
            const sortedCards = cards.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.price').textContent.replace('₹', ''));
                const priceB = parseInt(b.querySelector('.price').textContent.replace('₹', ''));
                
                return sortType === 'price-low' ? priceA - priceB : priceB - priceA;
            });

            const container = section.querySelector('.row');
            container.innerHTML = '';
            sortedCards.forEach(card => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.appendChild(card);
                container.appendChild(col);
            });
        });
    }
});