// Cart System - Separate Module
class CartSystem {
    constructor() {
        this.cart = [];
        this.init();
    }

    init() {
        this.setupCartUI();
        this.bindEvents();
        this.updateCartCount();
    }

    setupCartUI() {
        const cartMenuItem = document.querySelector('.cart-menu-item');
        if (cartMenuItem) {
            console.log('✅ Setting up cart system...');
            const cartDropdown = document.createElement('div');
            cartDropdown.className = 'cart-dropdown';
            cartMenuItem.appendChild(cartDropdown);
            
            const cartIconWrapper = cartMenuItem.querySelector('.cart-icon-wrapper');
            cartIconWrapper.addEventListener('click', () => this.toggleCartDropdown());
            console.log('✅ Cart system setup successfully');
        } else {
            console.log('❌ Cart menu item not found');
        }
    }

    bindEvents() {
        // Close cart dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const cartDropdown = document.querySelector('.cart-dropdown');
            const cartIconWrapper = document.querySelector('.cart-icon-wrapper');
            
            if (cartDropdown && cartDropdown.classList.contains('active')) {
                if (!cartIconWrapper.contains(e.target) && !cartDropdown.contains(e.target)) {
                    this.closeCartDropdown();
                }
            }
        });
    }

    addToCart(foodId) {
        const food = this.getFoodData().find(f => f.id === foodId);
        if (!food) return;
        
        const existingItem = this.cart.find(item => item.id === foodId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...food, quantity: 1 });
        }
        
        this.updateCartUI();
        this.updateCartCount();
        this.showNotification(`Added ${food.title} to cart! 🍣`);
    }

    removeFromCart(foodId) {
        this.cart = this.cart.filter(item => item.id !== foodId);
        this.updateCartUI();
        this.updateCartCount();
    }

    updateCartQuantity(foodId, change) {
        const item = this.cart.find(item => item.id === foodId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(foodId);
            } else {
                this.updateCartUI();
                this.updateCartCount();
            }
        }
    }

    updateCartCount() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            if (cartCount > 0) {
                cartBadge.classList.add('show');
            } else {
                cartBadge.classList.remove('show');
            }
        }
    }

    updateCartUI() {
        this.updateCartDropdown();
    }

    updateCartDropdown() {
        const cartDropdown = document.querySelector('.cart-dropdown');
        if (!cartDropdown) return;
        
        if (this.cart.length === 0) {
            cartDropdown.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartDropdown.innerHTML = `
            ${this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.imgSrc}" alt="${item.alt}">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="cartSystem.updateCartQuantity(${item.id}, -1)" title="Remove one">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cartSystem.updateCartQuantity(${item.id}, 1)" title="Add one">+</button>
                    </div>
                </div>
            `).join('')}
            <div class="cart-total">
                <strong>Total: $${total.toFixed(2)}</strong>
                <button class="checkout-btn" onclick="cartSystem.checkout()">Checkout</button>
            </div>
        `;
    }

    toggleCartDropdown() {
        const cartDropdown = document.querySelector('.cart-dropdown');
        if (cartDropdown) {
            cartDropdown.classList.toggle('active');
        }
    }

    closeCartDropdown() {
        const cartDropdown = document.querySelector('.cart-dropdown');
        if (cartDropdown) {
            cartDropdown.classList.remove('active');
        }
    }

    checkout() {
        if (this.cart.length === 0) return;
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.showNotification(`Order placed! Total: $${total.toFixed(2)} 🎉`);
        this.cart = [];
        this.updateCartUI();
        this.updateCartCount();
        this.closeCartDropdown();
    }

    getCart() {
        return this.cart;
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.updateCartUI();
        this.updateCartCount();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getFoodData() {
        // This should be imported from main.js or a separate data file
        return [
            {
                id: 1,
                imgSrc: 'assets/sushi-12.png',
                alt: "sushi-12",
                title: "Chezu Sushi",
                rating: 4.9,
                price: 21.00,
                category: "Sushi",
                description: "Premium salmon and avocado roll with special sauce",
                popularity: 95
            },
            {
                id: 2,
                imgSrc: 'assets/sushi-11.png',
                alt: "sushi-11",
                title: "Original Sushi",
                rating: 5.0,
                price: 19.00,
                category: "Sushi",
                description: "Classic tuna and cucumber roll with traditional preparation",
                popularity: 98
            },
            {
                id: 3,
                imgSrc: 'assets/sushi-10.png',
                alt: "sushi-10",
                title: "Ramen Legendo",
                rating: 4.7,
                price: 13.00,
                category: "Ramen",
                description: "Rich pork broth with tender chashu and perfectly cooked noodles",
                popularity: 92
            },
            {
                id: 4,
                imgSrc: 'assets/sushi-9.png',
                alt: "sushi-9",
                title: "Udon Deluxe",
                rating: 4.6,
                price: 15.00,
                category: "Udon",
                description: "Thick wheat noodles in savory dashi broth with tempura",
                popularity: 88
            },
            {
                id: 5,
                imgSrc: 'assets/sushi-8.png',
                alt: "sushi-8",
                title: "Dango Trio",
                rating: 4.5,
                price: 8.00,
                category: "Danggo",
                description: "Three traditional Japanese rice dumplings with sweet sauce",
                popularity: 85
            }
        ];
    }
}
function animateToCart(foodId) {
    const foodData = cartSystem.getFoodData().find(f => f.id === foodId);
    if (!foodData) return;
  
    const foodImg = document.createElement('img');
    foodImg.src = foodData.imgSrc;
    foodImg.style.position = 'fixed';
    foodImg.style.width = '50px';
    foodImg.style.height = '50px';
    foodImg.style.left = `${window.innerWidth / 2}px`;
    foodImg.style.top = `${window.innerHeight / 2}px`;
    foodImg.style.transition = 'all 0.8s ease-in-out';
    foodImg.style.zIndex = 9999;
  
    document.body.appendChild(foodImg);
  
    const cartIcon = document.querySelector('.cart-icon-wrapper');
    const rect = cartIcon.getBoundingClientRect();
  
    setTimeout(() => {
      foodImg.style.left = `${rect.left + rect.width / 2}px`;
      foodImg.style.top = `${rect.top + rect.height / 2}px`;
      foodImg.style.width = '0px';
      foodImg.style.height = '0px';
      foodImg.style.opacity = '0';
    }, 50);
  
    setTimeout(() => foodImg.remove(), 850);
  }
    document.addEventListener('DOMContentLoaded', () => {
    const catalogue = document.getElementById('food');
    const foods = cartSystem.getFoodData();
  
    catalogue.innerHTML = foods.map(food => `
      <article class="popular-foods__card">
        <img src="${food.imgSrc}" alt="${food.title}" class="popular-foods__card-image">
        <h4 class="popular-foods__card-title">${food.title}</h4>
  
        <div class="popular-foods__card-details flex-between">
          <div class="popular-foods__card-rating">
            <img src="assets/star.svg" alt="star">
            <p>${food.rating}</p>
          </div>
        </div>
  
        <div class="card-footer">
          <p class="popular-foods__card-price">$${food.price.toFixed(2)}</p>
          <button class="add-to-cart-btn" onclick="cartSystem.addToCart(${food.id}); animateToCart(${food.id});">
            Add to Cart <img src="assets/cart-icon.svg" alt="cart">
          </button>
        </div>
      </article>
    `).join('');
  });
  
  
  
  
// Initialize cart system when DOM is loaded
let cartSystem;
document.addEventListener('DOMContentLoaded', () => {
    cartSystem = new CartSystem();
});

// Export for global access
window.cartSystem = cartSystem;
window.addToCart = (foodId) => cartSystem?.addToCart(foodId); 