const medicines = {
    'volini': {
        name: 'Volini Pain Relief Spray',
        description: 'Volini Spray provides quick and effective pain relief. It helps relieve muscular pains and sprains through its deep penetrating action. The spray format ensures easy application and instant cooling.',
        price: '₹199',
        image: 'volini.png'
    },
    'immuno10': {
        name: 'Immuno 10 Plus',
        description: 'Immuno 10 Plus is an immunity booster supplement that contains a powerful blend of vitamins, minerals and herbs. It helps strengthen your body\'s natural defense system.',
        price: '₹299',
        image: 'immuno10.png'
    },
    'ashwagandha': {
        name: 'Organic Ashwagandha',
        description: 'Ashwagandha is an ancient medicinal herb with multiple health benefits. It can help reduce anxiety and stress, boost brain function, and help fight symptoms of depression.',
        price: '₹399',
        image: 'Aswaghandha.png'
    },

    // Daily Products
    'charcoal_soap': {
        name: 'Activated Charcoal Soap',
        description: 'Deep cleansing charcoal soap made with natural activated charcoal. Helps remove impurities, excess oil, and dead skin cells for clear and healthy skin. Suitable for all skin types.',
        price: '₹149',
        image: 'charcoal_soap.png'
    },
    'toothbrush': {
        name: 'Soft Bristle Toothbrush',
        description: 'Premium soft bristle toothbrush designed for sensitive gums and teeth. Features ergonomic handle and advanced cleaning technology for effective yet gentle dental care.',
        price: '₹99',
        image: 'toothbrush.png'
    },
    'wet_wipes': {
        name: 'Antibacterial Wet Wipes',
        description: 'Sanitizing wet wipes enriched with aloe vera and vitamin E. Kills 99.9% of germs while being gentle on skin. Perfect for daily hygiene and protection.',
        price: '₹129',
        image: 'wet_wipes.png'
    },

    // Vitamins & Supplements
    'flaxseed_oil': {
        name: 'Organic Flaxseed Oil',
        description: 'Pure organic flaxseed oil rich in Omega-3 fatty acids, lignans, and fiber. Supports heart health, brain function, and helps maintain healthy skin.',
        price: '₹449',
        image: 'Flaxseed_oil.png'
    },
    'tulsi_plus': {
        name: 'Tulsi Plus Capsules',
        description: 'Natural immunity booster capsules made with pure Holy Basil (Tulsi) extract. Helps strengthen immune system and provides relief from stress and anxiety.',
        price: '₹299',
        image: 'mulsi_plus.png'
    },
    'multivitamin': {
        name: 'Multivitamin Complex',
        description: 'Complete daily nutrition supplement with essential vitamins, minerals, and antioxidants. Supports overall health and wellbeing with balanced nutrition.',
        price: '₹499',
        image: 'Multiviamins.png'
    }
};

function addToCart(medicineId) {
    const medicine = medicines[medicineId];
    if (!medicine) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === medicineId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: medicineId,
            name: medicine.name,
            price: medicine.price,
            image: medicine.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAddedToCartMessage();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

function showAddedToCartMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    messageDiv.style.zIndex = '1000';
    messageDiv.textContent = 'Item added to cart!';
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const medicineId = urlParams.get('id');
    
    if (medicineId && medicines[medicineId]) {
        const medicine = medicines[medicineId];
        document.getElementById('medicineName').textContent = medicine.name;
        document.getElementById('medicineDescription').textContent = medicine.description;
        document.getElementById('medicinePrice').textContent = medicine.price;
        document.getElementById('medicineImage').src = medicine.image;
        document.title = `${medicine.name} - Medicine Store`;

        // Update add to cart button
        const addToCartBtn = document.querySelector('.btn-primary');
        addToCartBtn.onclick = () => addToCart(medicineId);
    } else {
        window.location.href = 'index.html';
    }

    updateCartCount();
});