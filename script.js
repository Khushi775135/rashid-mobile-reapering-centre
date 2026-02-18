/* Rashid Mobile Repairing - JavaScript */

// Initialize data from localStorage or set defaults
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: 'iPhone 14 Pro', brand: 'Apple', price: 89999, type: 'new', description: 'Latest iPhone with A16 chip' },
    { id: 2, name: 'iPhone 13', brand: 'Apple', price: 49999, type: 'used', description: 'Excellent condition, like new' },
    { id: 3, name: 'Samsung Galaxy S23', brand: 'Samsung', price: 74999, type: 'new', description: 'Flagship Samsung phone' },
    { id: 4, name: 'OnePlus 11', brand: 'OnePlus', price: 56999, type: 'new', description: 'Snapdragon 8 Gen 2' },
    { id: 5, name: 'Xiaomi 13 Pro', brand: 'Xiaomi', price: 62999, type: 'new', description: 'Leica camera system' },
    { id: 6, name: 'Vivo V27', brand: 'Vivo', price: 32999, type: 'new', description: 'Great for selfies' }
];

let accessories = JSON.parse(localStorage.getItem('accessories')) || [
    { id: 1, name: 'Fast Charger 65W', type: 'charger', price: 899, description: 'Universal fast charger' },
    { id: 2, name: 'Wireless Earbuds', type: 'earphone', price: 2499, description: 'Noise cancellation' },
    { id: 3, name: 'Premium Back Cover', type: 'cover', price: 499, description: 'Shockproof protection' },
    { id: 4, name: 'Tempered Glass (3 pcs)', type: 'tempered-glass', price: 299, description: '9H hardness protection' },
    { id: 5, name: 'Power Bank 20000mAh', type: 'power-bank', price: 1499, description: 'Fast charging power bank' },
    { id: 6, name: 'USB Type-C Cable', type: 'charger', price: 299, description: 'Durable braided cable' }
];

// Save to localStorage
function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('accessories', JSON.stringify(accessories));
}

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initMobileMenu();
    initStatsCounter();
    initThreeJS();
    initSmoothScroll();
    initPhoneFilters();
    initSellForm();
    initChatWidget();
    initAdminPanel();
    loadProducts();
    loadAccessories();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target;
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Three.js 3D Animation
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating phone model (simple box)
    const phoneGeometry = new THREE.BoxGeometry(1.5, 3, 0.1);
    const phoneMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00d4ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const phoneMesh = new THREE.Mesh(phoneGeometry, phoneMaterial);
    phoneMesh.position.set(3, 0, 0);
    scene.add(phoneMesh);

    camera.position.z = 5;

    // Animation
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        phoneMesh.rotation.y += 0.01;
        phoneMesh.rotation.x = mouseY * 0.5;
        phoneMesh.rotation.z = mouseX * 0.5;

        renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Phone Filters
function initPhoneFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const phonesGrid = document.getElementById('phones-grid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

function filterProducts(filter) {
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.type === filter);
    renderProducts(filteredProducts);
}

function loadProducts() {
    renderProducts(products);
}

function renderProducts(productsList) {
    const phonesGrid = document.getElementById('phones-grid');
    if (!phonesGrid) return;

    phonesGrid.innerHTML = productsList.map(product => `
        <div class="phone-card" data-type="${product.type}">
            <div class="phone-image">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="phone-info">
                <span class="type-badge ${product.type}">${product.type.toUpperCase()}</span>
                <h3>${product.name}</h3>
                <p class="phone-brand">${product.brand}</p>
                <p class="phone-price">₹${product.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
}

// Load Accessories
function loadAccessories() {
    renderAccessories(accessories);
}

function renderAccessories(accessoriesList) {
    const accessoriesGrid = document.getElementById('accessories-grid');
    if (!accessoriesGrid) return;

    accessoriesGrid.innerHTML = accessoriesList.map(accessory => `
        <div class="accessory-card">
            <div class="accessory-image">
                <i class="fas fa-${getAccessoryIcon(accessory.type)}"></i>
            </div>
            <div class="accessory-info">
                <h3>${accessory.name}</h3>
                <p>${accessory.type.replace('-', ' ').toUpperCase()}</p>
                <p class="accessory-price">₹${accessory.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
}

function getAccessoryIcon(type) {
    const icons = {
        'charger': 'charging-station',
        'earphone': 'headphones',
        'cover': 'mobile',
        'tempered-glass': 'shield-alt',
        'power-bank': 'battery-full'
    };
    return icons[type] || 'mobile-alt';
}

// Sell Form
function initSellForm() {
    const form = document.getElementById('sell-phone-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('seller-name').value,
            phone: document.getElementById('seller-phone').value,
            brand: document.getElementById('phone-brand').value,
            model: document.getElementById('phone-model').value,
            condition: document.getElementById('phone-condition').value,
            price: document.getElementById('expected-price').value,
            message: document.getElementById('seller-message').value
        };

        // Show success message
        alert('Thank you! We will contact you shortly. You can also WhatsApp us at +91 98765 43210');
        
        // WhatsApp redirect
        const whatsappMessage = `Hello Rashid Mobile, I want to sell my ${formData.brand} ${formData.model}. Condition: ${formData.condition}. Expected Price: ₹${formData.price}`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        
        form.reset();
    });
}

// Chat Widget
function initChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const chatClose = document.getElementById('chat-close');
    const sendMessage = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');

    if (!chatToggle || !chatWidget) return;

    chatToggle.addEventListener('click', () => {
        chatWidget.classList.add('active');
        chatToggle.style.display = 'none';
    });

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWidget.classList.remove('active');
            chatToggle.style.display = 'flex';
        });
    }

    const sendMsg = () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            
            // Simulate bot response
            setTimeout(() => {
                const responses = [
                    "Thank you for your message! How can I help you today?",
                    "We offer mobile repair, screen replacement, battery change, and more!",
                    "Our working hours are Mon-Sat: 9AM-9PM, Sunday: 10AM-5PM",
                    "You can also call us at +91 98765 43210",
                    "We also buy and sell second-hand phones!"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 1000);
            
            chatInput.value = '';
        }
    };

    if (sendMessage) {
        sendMessage.addEventListener('click', sendMsg);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMsg();
            }
        });
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Admin Panel
function initAdminPanel() {
    const adminToggle = document.getElementById('admin-toggle');
    const adminModal = document.getElementById('admin-modal');
    const adminClose = document.getElementById('admin-close');
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminPanels = document.querySelectorAll('.admin-panel');

    if (!adminToggle || !adminModal) return;

    adminToggle.addEventListener('click', () => {
        adminModal.classList.add('active');
    });

    if (adminClose) {
        adminClose.addEventListener('click', () => {
            adminModal.classList.remove('active');
        });
    }

    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.classList.remove('active');
        }
    });

    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            adminTabs.forEach(t => t.classList.remove('active'));
            adminPanels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-panel`).classList.add('active');
        });
    });

    // Product Form
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newProduct = {
                id: Date.now(),
                name: document.getElementById('product-name').value,
                brand: document.getElementById('product-brand').value,
                price: parseInt(document.getElementById('product-price').value),
                type: document.getElementById('product-type').value,
                description: document.getElementById('product-desc').value
            };
            
            products.push(newProduct);
            saveData();
            loadProducts();
            renderProductList();
            productForm.reset();
            alert('Product added successfully!');
        });
    }

    // Accessory Form
    const accessoryForm = document.getElementById('accessory-form');
    if (accessoryForm) {
        accessoryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newAccessory = {
                id: Date.now(),
                name: document.getElementById('accessory-name').value,
                price: parseInt(document.getElementById('accessory-price').value),
                type: document.getElementById('accessory-type').value
            };
            
            accessories.push(newAccessory);
            saveData();
            loadAccessories();
            renderAccessoryList();
            accessoryForm.reset();
            alert('Accessory added successfully!');
        });
    }

    // Render lists
    renderProductList();
    renderAccessoryList();
}

function renderProductList() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = products.map(product => `
        <div class="product-item">
            <div>
                <strong>${product.name}</strong> - ₹${product.price.toLocaleString()} (${product.type})
            </div>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    `).join('');
}

function renderAccessoryList() {
    const accessoryList = document.getElementById('accessory-list');
    if (!accessoryList) return;

    accessoryList.innerHTML = accessories.map(accessory => `
        <div class="accessory-item">
            <div>
                <strong>${accessory.name}</strong> - ₹${accessory.price.toLocaleString()} (${accessory.type})
            </div>
            <button class="delete-btn" onclick="deleteAccessory(${accessory.id})">Delete</button>
        </div>
    `).join('');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        saveData();
        loadProducts();
        renderProductList();
    }
}

function deleteAccessory(id) {
    if (confirm('Are you sure you want to delete this accessory?')) {
        accessories = accessories.filter(a => a.id !== id);
        saveData();
        loadAccessories();
        renderAccessoryList();
    }
}

// Make functions available globally
window.deleteProduct = deleteProduct;
window.deleteAccessory = deleteAccessory;
