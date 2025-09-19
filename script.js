document.addEventListener("DOMContentLoaded", function() {
    // 🔹 Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 🔹 Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 🔹 Trigger animasi hero section
    // Delay opsional 500ms supaya transisi lebih halus
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 300);

    // Smooth scrolling for anchor links
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Add scroll animation class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-animate');
        observer.observe(section);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(11, 60, 93, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(11, 60, 93, 0.95)';
        }
    });

    // Lightbox functionality for gallery
    const galleryImages = document.querySelectorAll(".image-grid img");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    galleryImages.forEach(image => {
        image.addEventListener("click", e => {
            lightbox.classList.add("active");
            const img = document.createElement("img");
            img.src = image.src;
            img.alt = image.alt;
            
            // Clear previous content
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            
            // Add close button
            const closeBtn = document.createElement("span");
            closeBtn.innerHTML = "&times;";
            closeBtn.className = "lightbox-close";
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(img);
        });
    });

    // Close lightbox when clicking outside image or on close button
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove("active");
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});