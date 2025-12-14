// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Days Counter Calculation
function calculateDaysTogether() {
    const startDate = new Date('2023-09-28');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function updateDaysCounter() {
    const days = calculateDaysTogether();
    const daysCount = document.getElementById('daysCount');
    const daysStat = document.getElementById('daysStat');
    const footerDays = document.getElementById('footerDays');
    
    if (daysCount) daysCount.textContent = days;
    if (daysStat) daysStat.textContent = days;
    if (footerDays) footerDays.textContent = days;
}

// Initialize days counter
updateDaysCounter();

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Back to top button
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery item click for modal
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const caption = this.querySelector('.gallery-caption')?.textContent || 'Memory';
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 20px;
        `;
        
        // Modal content
        modal.innerHTML = `
            <div style="max-width: 90%; max-height: 70%; margin-bottom: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <img src="${imgSrc}" alt="${caption}" style="width: 100%; height: auto; display: block;">
            </div>
            <div style="color: white; text-align: center; max-width: 500px;">
                <div style="font-family: 'Playfair Display', serif; font-size: 1.1rem; margin-bottom: 20px;">${caption}</div>
                <button class="modal-close" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 25px; cursor: pointer; font-size: 0.85rem; transition: all 0.3s;">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        // Close with Escape key
        const closeModal = (e) => {
            if (e.key === 'Escape') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                    document.removeEventListener('keydown', closeModal);
                }, 300);
            }
        };
        
        document.addEventListener('keydown', closeModal);
    });
});

// Timeline Animation
function animateTimelineOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (!timelineContainer) return;
    
    const containerPosition = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if timeline container is in viewport
    if (containerPosition.top < windowHeight - 100 && containerPosition.bottom > 0) {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Add scroll event for timeline animation
window.addEventListener('scroll', animateTimelineOnScroll);
window.addEventListener('load', animateTimelineOnScroll);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Update counter every day at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        updateDaysCounter();
        // Update every 24 hours
        setInterval(updateDaysCounter, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Initial timeline animation check
    animateTimelineOnScroll();
});

// Timeline animation fix for mobile
function fixTimelineLayout() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const isMobile = window.innerWidth < 768;
    
    timelineItems.forEach((item, index) => {
        if (isMobile) {
            // Reset animation delay untuk mobile
            item.style.animationDelay = (index * 0.1) + 's';
        }
    });
}

// Panggil saat load dan resize
window.addEventListener('load', fixTimelineLayout);
window.addEventListener('resize', fixTimelineLayout);