/*==============================================================================
  ECOMMERCE WEBSITE MAIN JAVASCRIPT
  This file contains all the interactive functionality for the website.
  Dependencies: Swiper.js (for sliders), Font Awesome icons
==============================================================================*/

/*===============================
  MOBILE MENU FUNCTIONALITY
  Handles showing and hiding the mobile navigation menu
===============================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Show menu - add class when toggle button is clicked */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Hide menu - remove class when close button is clicked */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* Close menu when clicking outside of it */
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("show-menu");
  }
});

/*===============================
  IMAGE GALLERY FUNCTIONALITY
  Allows users to click on thumbnail images to change the main product image
===============================*/
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

/* Initialize gallery if elements exist */
if (document.querySelector(".details__img") && document.querySelectorAll(".details__small-img")) {
  imgGallery();
}

/*===============================
  SWIPER SLIDER - CATEGORIES
  Initialize the category slider with navigation and responsive breakpoints
===============================*/
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  /* Responsive breakpoints for different screen sizes */
  breakpoints: {
    350: { slidesPerView: 2, spaceBetween: 24 },
    768: { slidesPerView: 3, spaceBetween: 24 },
    992: { slidesPerView: 4, spaceBetween: 24 },
    1200: { slidesPerView: 5, spaceBetween: 24 },
    1400: { slidesPerView: 6, spaceBetween: 24 },
  },
});

/*===============================
  SWIPER SLIDER - PRODUCTS
  Initialize the new arrivals/products slider with navigation
===============================*/
let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  /* Responsive breakpoints */
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 24 },
    992: { slidesPerView: 4, spaceBetween: 24 },
    1400: { slidesPerView: 4, spaceBetween: 24 },
  },
});

/*===============================
  PRODUCT TABS FUNCTIONALITY
  Switch between Featured, Popular, and New Added product tabs
===============================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    /* Hide all tab contents */
    tabsContents.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });

    /* Show the targeted content */
    target.classList.add("active-tab");

    /* Remove active state from all tab buttons */
    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    /* Add active state to the clicked tab button */
    tab.classList.add("active-tab");
  });
});

/*===============================
  HEADER SCROLL EFFECT
  Adds visual effect to header when user scrolls down the page
  - Changes header appearance at 100px scroll
===============================*/
const scrollHeader = () => {
  const header = document.querySelector('.header');
  /* Add scroll-header class when scroll position is greater than 100px */
  if (window.scrollY >= 100) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
};

/* Listen for scroll events */
window.addEventListener('scroll', scrollHeader);

/* Trigger on page load in case user refreshes while scrolled down */
scrollHeader();

/*===============================
  SHOPPING CART FUNCTIONALITY
  Manages adding products to cart and updating cart UI
===============================*/
const cartCountBadge = document.querySelector('.cart-count-badge');
/* Initialize cart from localStorage or create empty array if not exists */
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * Updates the cart count display and shows a bump animation
 */
function updateCartUI() {
  const totalItems = cartItems.length;
  cartCountBadge.innerText = totalItems;
  /* Add bump class for animation */
  cartCountBadge.classList.add('bump');
  setTimeout(() => cartCountBadge.classList.remove('bump'), 300);
}

/* Update cart UI on page load */
if (cartCountBadge) {
  updateCartUI();
}

/* Add to cart button event listeners */
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    /* Get product data from data attributes */
    const productId = e.target.dataset.id || Date.now().toString();
    const productName = e.target.dataset.name || 'Product';
    
    const product = { 
      id: productId, 
      name: productName
    }; 
    
    cartItems.push(product);
    /* Save to localStorage */
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
  });
});

/*===============================
  COUNTDOWN TIMER
  Displays a countdown timer for special deals/offers
  - Counts down 3 days from current time
===============================*/
const countDowndate = () => {
  /* Set target date to 3 days from now */
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const update = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    /* Calculate time units */
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdowns = document.querySelectorAll('.countdown');

    /* Update all countdown elements on the page */
    countdowns.forEach((timer) => {
      const periods = timer.querySelectorAll('.countdown__period');
      
      /* Add leading zero if number is less than 10 */
      periods[0].innerText = days < 10 ? '0' + days : days;
      periods[1].innerText = hours < 10 ? '0' + hours : hours;
      periods[2].innerText = minutes < 10 ? '0' + minutes : minutes;
      periods[3].innerText = seconds < 10 ? '0' + seconds : seconds;
    });

    /* Handle expired offer */
    if (distance < 0) {
      clearInterval(interval);
      const countdownText = document.querySelector('.deals__countdown-text');
      if (countdownText) {
        countdownText.innerText = "Offer Expired!";
      }
    }
  };

  /* Update every second */
  const interval = setInterval(update, 1000);
  update();
};

/* Initialize countdown if countdown elements exist */
if (document.querySelector('.countdown')) {
  countDowndate();
}

/*===============================
  BACK TO TOP BUTTON
  Provides easy navigation back to the top of the page
===============================*/
const backToTopBtn = document.getElementById("backToTop");

/**
 * Shows or hides the back-to-top button based on scroll position
 */
function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

/* Listen for scroll events to toggle button visibility */
window.addEventListener('scroll', scrollFunction);

/* Trigger on page load */
scrollFunction();

/**
 * Smoothly scroll back to top when button is clicked
 */
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/*===============================
  PRODUCT QUICK ACTIONS
  Handles quick view, wishlist, and compare action buttons
===============================*/

/* Quick View button functionality */
document.querySelectorAll('.action__btn[aria-label="Quick View"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    /* Add your quick view modal logic here */
    console.log('Quick View clicked');
  });
});

/* Wishlist button functionality */
document.querySelectorAll('.action__btn[aria-label="Add to Wishlist"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    /* Add your wishlist logic here */
    console.log('Add to Wishlist clicked');
  });
});

/* Compare button functionality */
document.querySelectorAll('.action__btn[aria-label="Compare"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    /* Add your compare logic here */
    console.log('Compare clicked');
  });
});

/* Add to Cart from product cards */
document.querySelectorAll('.action__btn.cart__btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    /* Add to cart logic - same as add-to-cart-btn */
    const productId = btn.dataset.id || Date.now().toString();
    const productName = btn.dataset.name || 'Product';
    
    const product = { 
      id: productId, 
      name: productName
    }; 
    
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
  });
});

/*===============================
  NEWSLETTER FORM
  Handles newsletter subscription form submission
===============================*/
const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('.newsletter__input');
    const email = emailInput.value;
    
    /* Add your newsletter subscription logic here */
    console.log('Newsletter subscription:', email);
    
    /* Show success message */
    alert('Thank you for subscribing!');
    emailInput.value = '';
  });
}

/*===============================
  SEARCH FUNCTIONALITY
  Handles header search form submission
===============================*/
const searchBtn = document.querySelector('.search__btn');
if (searchBtn) {
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.header__search .form__input');
    const searchTerm = searchInput.value;
    
    /* Add your search logic here */
    console.log('Search:', searchTerm);
    
    /* Optionally redirect to shop page with search term */
    if (searchTerm) {
      // window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`;
    }
  });
}

/* Allow search on Enter key */
const headerSearchInput = document.querySelector('.header__search .form__input');
if (headerSearchInput) {
  headerSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchBtn.click();
    }
  });
}
