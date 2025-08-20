
let cart = [];
let currentFilter = 'All';
let currentSort = 'popularity';
let isDarkMode = false;

// Food data with categories
const foodData = [
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

const trendingSushis = [
    'Make Sushi',
    'Nigiri Sushi',
    'Oshizushi',
    'Temaki Sushi',
    'Uramaki Sushi',
    'Inari Sushi'
];

const trendingDrinks = [
    "Oruncha",
    "Ofukucha",
    "Sakura Tea",
    "Kombu-cha",
    "Aojiru",
    "Mugicha",
];

// Testimonials data
const testimonials = [
    {
        name: "Sarah Johnson",
        image: "assets/user.png",
        rating: 5,
        text: "This is the best Japanese food delivery service that ever existed. The sushi is always fresh and the delivery is lightning fast!",
        date: "2024-01-15"
    },
    {
        name: "Michael Chen",
        image: "assets/user.png",
        rating: 5,
        text: "Amazing quality and authentic taste. The ramen is absolutely incredible - just like in Japan!",
        date: "2024-01-10"
    },
    {
        name: "Emma Rodriguez",
        image: "assets/user.png",
        rating: 4,
        text: "Great service and delicious food. The udon noodles are perfectly cooked every time.",
        date: "2024-01-08"
    }
];


// Search Functionality
function toggleSearch() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) {
        createSearchContainer();
    } else {
        searchContainer.classList.toggle('active');
    }
}

function createSearchContainer() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-overlay"></div>
        <div class="search-modal">
            <div class="search-header">
                <h3>Search Menu</h3>
                <button class="search-close">&times;</button>
            </div>
            <input type="text" class="search-input" placeholder="Search for sushi, ramen, udon...">
            <div class="search-results"></div>
        </div>
    `;
    document.body.appendChild(searchContainer);
    
    const searchInput = searchContainer.querySelector('.search-input');
    const searchResults = searchContainer.querySelector('.search-results');
    const searchClose = searchContainer.querySelector('.search-close');
    const searchOverlay = searchContainer.querySelector('.search-overlay');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const results = foodData.filter(food => 
            food.title.toLowerCase().includes(query) || 
            food.category.toLowerCase().includes(query)
        );
        displaySearchResults(results, searchResults);
    });
    
    searchClose.addEventListener('click', () => {
        searchContainer.classList.remove('active');
    });
    
    searchOverlay.addEventListener('click', () => {
        searchContainer.classList.remove('active');
    });
    
    searchContainer.classList.add('active');
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<p class="no-results">No items found</p>';
        return;
    }
    
    container.innerHTML = results.map(food => `
        <div class="search-result-item" onclick="cartSystem.addToCart(${food.id})">
            <img src="${food.imgSrc}" alt="${food.alt}">
            <div class="search-result-info">
                <h4>${food.title}</h4>
                <p>${food.category} • $${food.price}</p>
            </div>
        </div>
    `).join('');
}


// Food Filtering and Sorting
function filterFoods(category) {
    currentFilter = category;
    renderFoodCards();
    updateFilterButtons();
}

function sortFoods(sortBy) {
    currentSort = sortBy;
    renderFoodCards();
}

function renderFoodCards() {
    let filteredFoods = foodData;
    
    // Apply filter
    if (currentFilter !== 'All') {
        filteredFoods = foodData.filter(food => food.category === currentFilter);
    }
    
    // Apply sort
    switch (currentSort) {
        case 'price-low':
            filteredFoods.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredFoods.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredFoods.sort((a, b) => b.rating - a.rating);
            break;
        case 'popularity':
        default:
            filteredFoods.sort((a, b) => b.popularity - a.popularity);
            break;
    }
    
    const popularFoodsContainer = document.querySelector('.popular-foods__catalogue');
    if (popularFoodsContainer) {
        popularFoodsContainer.innerHTML = filteredFoods.map(food => `
            <article class="popular-foods__card" onclick="openFoodModal(${food.id})">
                <img class="popular-foods__card-image" src="${food.imgSrc}" alt="${food.alt}" />
                <h4 class="popular-foods__card-title">${food.title}</h4>
                <div class="popular-foods__card-details flex-between">
                    <div class="popular-foods__card-rating">
                        <img src="assets/star.svg" alt="star" />
                        <p>${food.rating}</p>
                    </div>
                    <p class="popular-foods__card-price">$${food.price.toFixed(2)}</p>
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); cartSystem.addToCart(${food.id})">
                    Add to Cart
                </button>
            </article>
        `).join('');
    }
}

function updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.popular-foods__filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === currentFilter) {
            btn.classList.add('active');
        }
    });
}

// Food Detail Modal
function openFoodModal(foodId) {
    const food = foodData.find(f => f.id === foodId);
    if (!food) return;
    
    const modal = document.createElement('div');
    modal.className = 'food-modal';
    modal.innerHTML = `
        <div class="food-modal-overlay"></div>
        <div class="food-modal-content">
            <button class="food-modal-close">&times;</button>
            <div class="food-modal-image">
                <img src="${food.imgSrc}" alt="${food.alt}">
            </div>
            <div class="food-modal-info">
                <h2>${food.title}</h2>
                <p class="food-modal-category">${food.category}</p>
                <p class="food-modal-description">${food.description}</p>
                <div class="food-modal-rating">
                    <img src="assets/star.svg" alt="star">
                    <span>${food.rating} (${food.popularity}% popular)</span>
                </div>
                <div class="food-modal-price">
                    <span class="price">$${food.price.toFixed(2)}</span>
                    <button class="add-to-cart-modal-btn" onclick="cartSystem.addToCart(${food.id}); this.closest('.food-modal').remove();">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.food-modal-close');
    const overlay = modal.querySelector('.food-modal-overlay');
    
    closeBtn.addEventListener('click', closeFoodModal);
    overlay.addEventListener('click', closeFoodModal);
    
    function closeFoodModal() {
        modal.remove();
    }
}

// Newsletter Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const newsletterInput = document.querySelector('.subscription__form input');
    const email = newsletterInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification('Thanks for subscribing! 🍣', 'success');
    newsletterInput.value = '';
}

// Testimonials Carousel
let currentTestimonialIndex = 0;

function renderTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-carousel');
    if (!testimonialsContainer) return;
    
    testimonialsContainer.innerHTML = `
        <div class="testimonials-track">
            ${testimonials.map((testimonial, index) => `
                <div class="testimonial-slide ${index === currentTestimonialIndex ? 'active' : ''}">
                    <div class="testimonial-content">
                        <div class="testimonial-rating">
                            ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                        </div>
                        <p class="testimonial-text">"${testimonial.text}"</p>
                        <div class="testimonial-author">
                            <img src="${testimonial.image}" alt="${testimonial.name}">
                            <div>
                                <h4>${testimonial.name}</h4>
                                <p>${new Date(testimonial.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="testimonial-dots">
            ${testimonials.map((_, index) => `
                <button class="testimonial-dot ${index === currentTestimonialIndex ? 'active' : ''}" 
                        onclick="goToTestimonial(${index})"></button>
            `).join('')}
        </div>
    `;
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    renderTestimonials();
}

function goToTestimonial(index) {
    currentTestimonialIndex = index;
    renderTestimonials();
}

// Dark Mode Toggle - Improved
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        if (isDarkMode) {
            toggleBtn.classList.add('active');
        } else {
            toggleBtn.classList.remove('active');
        }
    }
}

// Reservation System
function handleReservationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    const time = formData.get('time');
    const guests = formData.get('guests');
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (!date || !time || !guests || !name || !email) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification(`Reservation confirmed for ${name} on ${date} at ${time} for ${guests} guests! 🎉`, 'success');
    e.target.reset();
}

// Utility Functions
function showNotification(message, type = 'info') {
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

// Parallax Effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Initialize all features
function initializeFeatures() {
    console.log('🚀 Initializing Sushi Restaurant Features...');
    
    // Cart system is now handled by cart.js
    
    // Add dark mode toggle
    const header = document.querySelector('header');
    if (header) {
        console.log('✅ Adding dark mode toggle...');
        const darkModeBtn = document.createElement('button');
        darkModeBtn.className = 'dark-mode-toggle';
        darkModeBtn.addEventListener('click', toggleDarkMode);
        header.appendChild(darkModeBtn);
        console.log('✅ Dark mode toggle added successfully');
    } else {
        console.log('❌ Header not found');
    }
    
    // Add sort dropdown
    const popularFoodsSection = document.querySelector('.popular-foods');
if (popularFoodsSection) {
    console.log('✅ Adding sort dropdown...');
    const sortContainer = document.createElement('div');
    sortContainer.className = 'sort-container'; // ✅ no inline styles
    sortContainer.innerHTML = `
        <select class="sort-select">
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Rating</option>
            <option value="price-low">Sort by Price (Low to High)</option>
            <option value="price-high">Sort by Price (High to Low)</option>
        </select>
    `;
    const catalogue = popularFoodsSection.querySelector('.popular-foods__catalogue');
    if (catalogue) {
        popularFoodsSection.insertBefore(sortContainer, catalogue);
        
        const sortSelect = sortContainer.querySelector('.sort-select');
        sortSelect.addEventListener('change', (e) => sortFoods(e.target.value));
        console.log('✅ Sort dropdown added successfully');
    }
} else {
    console.log('❌ Popular foods section not found');
}

    // Testimonials carousel will be added after reservation section
    
    // Add reservation section
    const subscriptionSection = document.querySelector('.subscription');
    if (subscriptionSection) {
        console.log('✅ Adding reservation section...');
        const reservationSection = document.createElement('section');
        reservationSection.className = 'reservation-section';
        reservationSection.style.cssText = 'padding: 80px 20px; text-align: center; background: white; margin: 40px 0; border-radius: 12px;';
        reservationSection.innerHTML = `
            <h2 style="color: #333; margin-bottom: 20px;">Book a Table</h2>
            <p style="color: #666; margin-bottom: 40px;">Reserve your spot for an authentic Japanese dining experience</p>
            <form class="reservation-form" style="max-width: 600px; margin: 0 auto;">
                <div class="form-row" style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <input type="text" name="name" placeholder="Your Name" required style="flex: 1; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; background: #f9f9f9; color: #333; font-size: 16px;">
                    <input type="email" name="email" placeholder="Your Email" required style="flex: 1; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; background: #f9f9f9; color: #333; font-size: 16px;">
                </div>
                <div class="form-row" style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <input type="date" name="date" required style="flex: 1; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; background: #f9f9f9; color: #333; font-size: 16px;">
                    <input type="time" name="time" required style="flex: 1; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; background: #f9f9f9; color: #333; font-size: 16px;">
                    <select name="guests" required style="flex: 1; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; background: #f9f9f9; color: #333; font-size: 16px;">
                        <option value="">Number of Guests</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ Guests</option>
                    </select>
                </div>
                <button type="submit" style="background: #b1454a; color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background-color 0.3s ease;">Book Table</button>
            </form>
        `;
        subscriptionSection.parentNode.insertBefore(reservationSection, subscriptionSection.nextSibling);
        
        const reservationForm = reservationSection.querySelector('.reservation-form');
        reservationForm.addEventListener('submit', handleReservationSubmit);
        console.log('✅ Reservation section added successfully');
        
        // Add testimonials carousel after reservation section
        console.log('✅ Adding testimonials carousel after reservation...');
        const testimonialsSection = document.createElement('section');
        testimonialsSection.className = 'testimonials-section';
        testimonialsSection.style.cssText = 'padding: 80px 20px; text-align: center; background: var(--bg-secondary); margin: 40px 0; border-radius: 12px;';
        testimonialsSection.innerHTML = `
            <h2 style="color: var(--text-primary); margin-bottom: 40px;">What Our Customers Say</h2>
            <div class="testimonials-carousel" style="margin-top: 40px; padding: 20px; background: var(--bg-secondary); border-radius: 12px; box-shadow: 0 10px 25px var(--shadow-color);">
            </div>
        `;
        reservationSection.parentNode.insertBefore(testimonialsSection, reservationSection.nextSibling);
        
        const testimonialsContainer = testimonialsSection.querySelector('.testimonials-carousel');
        if (testimonialsContainer) {
            renderTestimonials();
            console.log('✅ Testimonials carousel added successfully after reservation');
        }
    } else {
        console.log('❌ Subscription section not found');
    }
    
    // Add floating action button
    console.log('✅ Adding floating action button...');
    const floatingBtn = document.createElement('button');
    floatingBtn.className = 'floating-action-btn';
    floatingBtn.innerHTML = '🍣 Order Now';
    floatingBtn.style.cssText = 'position: fixed; bottom: 30px; right: 30px; background: #b1454a; color: white; border: none; padding: 15px 25px; border-radius: 50px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; transition: transform 0.3s ease, box-shadow 0.3s ease;';
    floatingBtn.addEventListener('click', () => {
        if (cartSystem) {
            cartSystem.toggleCartDropdown();
        }
    });
    document.body.appendChild(floatingBtn);
    console.log('✅ Floating action button added successfully');
    
    // Add interactive map
    const footer = document.querySelector('.footer');
    if (footer) {
        console.log('✅ Adding interactive map...');
        const mapSection = document.createElement('section');
        mapSection.className = 'map-section';
        mapSection.style.cssText = 'padding: 80px 20px; text-align: center; background: white; margin: 40px 0; border-radius: 12px;';
        mapSection.innerHTML = `
            <h2 style="color: #333; margin-bottom: 20px;">Find Us</h2>
            <div class="map-container" style="max-width: 800px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                    width="100%" 
                    height="300" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            </div>
        `;
        footer.parentNode.insertBefore(mapSection, footer);
        console.log('✅ Interactive map added successfully');
    } else {
        console.log('❌ Footer not found');
    }
    
    // Event listeners
    // Mobile menu functionality removed
    
    const searchIcon = document.querySelector('.header__menu li img[alt="search"]');
    if (searchIcon) {
        searchIcon.addEventListener('click', toggleSearch);
        console.log('✅ Search icon event listener added');
    } else {
        console.log('❌ Search icon not found');
    }
    
    const newsletterForm = document.querySelector('.subscription__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        console.log('✅ Newsletter form event listener added');
    } else {
        console.log('❌ Newsletter form not found');
    }
    
    // Filter button event listeners
    const filterButtons = document.querySelectorAll('.popular-foods__filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.textContent.trim();
            filterFoods(category);
        });
    });
    console.log(`✅ Added event listeners to ${filterButtons.length} filter buttons`);
    
    // Parallax effect
    window.addEventListener('scroll', handleParallax);
    console.log('✅ Parallax effect event listener added');
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        toggleDarkMode();
    }
    
    // Initial render
    renderFoodCards();
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
    
}



// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFeatures);

// Export functions for global access
window.openFoodModal = openFoodModal;
window.goToTestimonial = goToTestimonial;
window.filterFoods = filterFoods;
window.sortFoods = sortFoods;



