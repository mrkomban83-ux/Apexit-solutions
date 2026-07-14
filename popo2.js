document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dark / Light Mode Engine
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // 2. Responsive Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // 3. Dynamic Portfolio Filter Architecture
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });

    // 4. Contact Form Validation and Mock Submission API Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if(!name || !email || !message) {
            formStatus.style.color = '#ef4444';
            formStatus.textContent = "All deployment parameters are required.";
            return;
        }

        // Fixed the syntax error here by wrapping the CSS variable in a string string template
        formStatus.style.color = 'var(--text-primary)';
        formStatus.textContent = "Transmitting metrics...";

        setTimeout(() => {
            formStatus.style.color = '#10b981';
            formStatus.textContent = "Data payload successfully verified and transmitted!";
            contactForm.reset();
        }, 1500);
    });

    // 5. Active Link Highlight Engine on Scrolling
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
        // 6. Dynamic Local Visitor Tracker and Active Counter Engine
    const visitorElement = document.getElementById('visitor-count');
    const activeElement = document.getElementById('active-count');

    // Simple persistent counter simulation using localStorage
    let totalVisits = parseInt(localStorage.getItem('site_visits')) || 1420;
    
    // Increment visit count by 1 only once per session setup
    if (!sessionStorage.getItem('session_active')) {
        totalVisits += 1;
        localStorage.setItem('site_visits', totalVisits);
        sessionStorage.setItem('session_active', 'true');
    }
    
    // Display formatted layout number
    visitorElement.textContent = totalVisits.toLocaleString();

    // Simulate fluctuation of real-time active users online
    setInterval(() => {
        let currentActive = parseInt(activeElement.textContent);
        // Randomly add or subtract 1 or 2 users to make it look alive
        let change = Math.floor(Math.random() * 5) - 2; 
        let newActive = currentActive + change;
        
        // Keep active users bounded between a realistic range (e.g., 5 to 25)
        if (newActive < 5) newActive = 5;
        if (newActive > 25) newActive = 25;
        
        activeElement.textContent = newActive;
    }, 4000);

    // 8. 3D Parallax Mouse Tracking Vector Engine
    const heroSection = document.getElementById('hero');
    const movingBgImg = document.getElementById('movingBgImg');

    if (heroSection && movingBgImg) {
        heroSection.addEventListener('mousemove', (e) => {
            // Get mouse positions relative to total window axis viewport
            const { clientX, clientY } = e;
            const { clientWidth, clientHeight } = heroSection;

            // Calculate precise offsets from the exact screen center
            const xOffset = (clientX / clientWidth - 0.5) * 35; // Change 35 to increase/decrease speed
            const yOffset = (clientY / clientHeight - 0.5) * 35;

            // Move the background container smoothly in the exact opposite direction of the cursor
            movingBgImg.style.transform = `translate(${-xOffset}px, ${-yOffset}px) scale(1.05)`;
        });

        // Reset background alignment layout smoothly when cursor exits section space
        heroSection.addEventListener('mouseleave', () => {
            movingBgImg.style.transform = 'translate(0px, 0px) scale(1)';
        });
    }
    });
});