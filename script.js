// Wedding Invitation Website JavaScript

// Global Variables
let currentPage = 'entryGate';
let countdownInterval;
let isMusicPlaying = false;
let audioElement;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set initial page
    showPage('entryGate');
    
    // Initialize music
    initializeMusic();
    
    // Try to autoplay music
    attemptAutoplay();
    
    // Initialize countdown if on countdown page
    if (currentPage === 'countdown') {
        startCountdown();
    }
    
    // Add keyboard navigation
    setupKeyboardNavigation();
    
    // Add touch gestures for mobile
    setupTouchGestures();
    
    // Add entrance animations
    addEntranceAnimations();
}

// Page Navigation
function navigateToPage(pageId) {
    if (currentPage === pageId) return;
    
    // Hide current page with animation
    const currentPageElement = document.getElementById(currentPage);
    const nextPageElement = document.getElementById(pageId);
    
    if (!currentPageElement || !nextPageElement) {
        console.error('Page elements not found');
        return;
    }
    
    // Add transition animation
    currentPageElement.classList.remove('active');
    currentPageElement.style.transform = 'translateX(-100%)';
    
    // Show next page
    setTimeout(() => {
        nextPageElement.classList.add('active');
        nextPageElement.classList.add('loading');
        nextPageElement.style.transform = 'translateX(0)';
        
        // Remove loading class after animation
        setTimeout(() => {
            nextPageElement.classList.remove('loading');
        }, 800);
        
        // Update current page
        currentPage = pageId;
        
        // Page-specific initialization
        initializePage(pageId);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
    }, 300);
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.transform = 'translateX(100%)';
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.transform = 'translateX(0)';
        currentPage = pageId;
        initializePage(pageId);
    }
}

function initializePage(pageId) {
    switch(pageId) {
        case 'countdown':
            startCountdown();
            break;
        case 'thankyou':
            startConfetti();
            break;
        case 'location':
            initializeMap();
            break;
        default:
            // Stop countdown when leaving countdown page
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
    }
}

// Countdown Timer
function startCountdown() {
    // Set wedding date (25th April 2026, 7:00 PM)
    const weddingDate = new Date('2026-04-27T19:00:00').getTime();
    
    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Update countdown immediately
    updateCountdown(weddingDate);
    
    // Update countdown every second
    countdownInterval = setInterval(() => {
        updateCountdown(weddingDate);
    }, 1000);
}

function updateCountdown(weddingDate) {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        // Wedding day has arrived
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Show wedding day message
        const weddingDateElement = document.querySelector('.wedding-date');
        if (weddingDateElement) {
            weddingDateElement.innerHTML = '<h3>🎉 Today is the Wedding Day! 🎉</h3><p>The celebration begins!</p>';
        }
        return;
    }
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display with animation
    updateCountdownDisplay('days', days);
    updateCountdownDisplay('hours', hours);
    updateCountdownDisplay('minutes', minutes);
    updateCountdownDisplay('seconds', seconds);
}

function updateCountdownDisplay(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        const formattedValue = value.toString().padStart(2, '0');
        if (element.textContent !== formattedValue) {
            // Add pulse animation
            element.style.transform = 'scale(1.2)';
            element.textContent = formattedValue;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Music Control
function initializeMusic() {
    // Create audio element
    audioElement = new Audio();
    audioElement.loop = true;
    audioElement.volume = 0.3;
    
    // Try multiple possible paths for the music file
    const possiblePaths = [
        'Wedding.mp3',
        './Wedding.mp3',
        '/Wedding.mp3',
        'assets/wedding.mp3',
        './assets/wedding.mp3'
    ];
    
    // Try to load the music file
    loadMusicFile(possiblePaths);
    
    // Music toggle button
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
}

// Function to try loading music from different paths
function loadMusicFile(paths) {
    let pathIndex = 0;
    
    function tryNextPath() {
        if (pathIndex >= paths.length) {
            console.log('All music paths failed');
            showNotification('Music file not found. Please ensure wedding.mp3 is uploaded');
            return;
        }
        
        const testAudio = new Audio();
        testAudio.src = paths[pathIndex];
        
        testAudio.addEventListener('canplaythrough', function() {
            // Found working path
            audioElement.src = paths[pathIndex];
            console.log('Music loaded from:', paths[pathIndex]);
        });
        
        testAudio.addEventListener('error', function() {
            console.log('Failed to load from:', paths[pathIndex]);
            pathIndex++;
            tryNextPath();
        });
        
        // Trigger loading
        testAudio.load();
    }
    
    tryNextPath();
}

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    
    if (!audioElement.src) {
        // If no music source, show message
        showNotification('Music file not found');
        return;
    }
    
    if (isMusicPlaying) {
        audioElement.then();
        musicToggle.textContent = '🎵';
        musicToggle.style.background = 'rgba(212, 175, 55, 0.9)';
        isMusicPlaying = false;
    } else {
        // Try to play music
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicToggle.textContent = '🔇';
                musicToggle.style.background = 'rgba(128, 0, 32, 0.9)';
                isMusicPlaying = true;
            }).catch(error => {
                console.log('Music play failed:', error);
                showNotification('Click anywhere on the page to enable music');
                
                // Add one-time click listener to enable music
                document.addEventListener('click', function enableMusic() {
                    audioElement.play().then(() => {
                        musicToggle.textContent = '🔇';
                        musicToggle.style.background = 'rgba(128, 0, 32, 0.9)';
                        isMusicPlaying = true;
                    }).catch(e => console.log('Still failed:', e));
                    document.removeEventListener('click', enableMusic);
                }, { once: true });
            });
        }
    }
}

// Autoplay music when website opens
function attemptAutoplay() {
    const musicToggle = document.getElementById('musicToggle');
    
    if (!audioElement.src) {
        return;
    }
    
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Music started successfully
            musicToggle.textContent = '🔇';
            musicToggle.style.background = 'rgba(128, 0, 32, 0.9)';
            isMusicPlaying = true;
            console.log('Music autoplay started successfully');
        }).catch(error => {
            // Autoplay was blocked (common in modern browsers)
            console.log('Autoplay blocked:', error);
            
            // Add user interaction listener to start music
            document.addEventListener('click', function startMusicOnInteraction() {
                audioElement.play().then(() => {
                    musicToggle.textContent = '🔇';
                    musicToggle.style.background = 'rgba(128, 0, 32, 0.9)';
                    isMusicPlaying = true;
                    console.log('Music started after user interaction');
                }).catch(e => console.log('Still failed to start music:', e));
                document.removeEventListener('click', startMusicOnInteraction);
            }, { once: true });
            
            // Also add touch listener for mobile
            document.addEventListener('touchstart', function startMusicOnTouch() {
                audioElement.play().then(() => {
                    musicToggle.textContent = '🔇';
                    musicToggle.style.background = 'rgba(128, 0, 32, 0.9)';
                    isMusicPlaying = true;
                    console.log('Music started after touch interaction');
                }).catch(e => console.log('Still failed to start music:', e));
                document.removeEventListener('touchstart', startMusicOnTouch);
            }, { once: true });
        });
    }
}

// Keyboard Navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                navigateToNextPage();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateToPreviousPage();
                break;
            case 'Home':
                e.preventDefault();
                navigateToPage('entryGate');
                break;
            case 'End':
                e.preventDefault();
                navigateToPage('thankyou');
                break;
        }
    });
}

function navigateToNextPage() {
    const pages = ['entryGate', 'invitation', 'events', 'countdown', 'location', 'thankyou'];
    const currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex < pages.length - 1) {
        navigateToPage(pages[currentIndex + 1]);
    }
}

function navigateToPreviousPage() {
    const pages = ['entryGate', 'invitation', 'events', 'countdown', 'location', 'thankyou'];
    const currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex > 0) {
        navigateToPage(pages[currentIndex - 1]);
    }
}

// Touch Gestures for Mobile
function setupTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next page
                navigateToNextPage();
            } else {
                // Swipe right - previous page
                navigateToPreviousPage();
            }
        }
    }
}

// Entrance Animations
function addEntranceAnimations() {
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.primary-btn, .event-card, .countdown-item');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Confetti Animation for Thank You Page
function startConfetti() {
    const confettiElements = document.querySelectorAll('.confetti');
    
    confettiElements.forEach((confetti, index) => {
        confetti.style.animationDelay = `${index * 0.2}s`;
    });
}

// Map Initialization
function initializeMap() {
    // Add any additional map initialization here
    // The iframe in HTML should work for basic functionality
}

// Notification System
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--maroon);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        font-size: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const notificationStyles = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Page Visibility API - Pause animations when page is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause animations
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        if (isMusicPlaying && audioElement) {
            audioElement.pause();
        }
    } else {
        // Page is visible, resume animations
        if (currentPage === 'countdown') {
            startCountdown();
        }
        if (isMusicPlaying && audioElement) {
            audioElement.play().catch(e => console.log('Resume failed:', e));
        }
    }
});

// Preload images for better performance
function preloadImages() {
    const images = [
        // Add any images you want to preload here
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add smooth parallax effect to floating decorations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const decorations = document.querySelectorAll('.flower, .heart');
    
    decorations.forEach((decoration, index) => {
        const speed = 0.5 + (index * 0.1);
        decoration.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form validation (if you add any forms later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Debug function to show current page
function debugCurrentPage() {
    console.log('Current page:', currentPage);
    console.log('Active elements:', document.querySelectorAll('.page.active'));
}

// Add to global scope for easy debugging
window.debugCurrentPage = debugCurrentPage;
window.navigateToPage = navigateToPage;

// Performance monitoring
if (window.performance && window.performance.mark) {
    window.performance.mark('app-start');
    
    window.addEventListener('load', function() {
        window.performance.mark('app-loaded');
        window.performance.measure('app-load-time', 'app-start', 'app-loaded');
        
        const loadTime = window.performance.getEntriesByName('app-load-time')[0];
        console.log('App load time:', loadTime.duration, 'ms');
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh the page.');
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
