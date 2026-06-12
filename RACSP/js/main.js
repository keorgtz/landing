/**
 * RACSP Landing Page JavaScript
 * Handles navigation, mobile menu, scroll reveals, and active section highlighting
 */

(function() {
    'use strict';

    // ─── DOM Elements ───
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const revealElements = document.querySelectorAll('.feature-card, .step, .file-card, .cli-card, .info-card, .section-header, .hero-content, .architecture-diagram, .architecture-info, .opensource-content, .docs-cta-content');
    const sections = document.querySelectorAll('section[id]');

    // ─── State ───
    let isMenuOpen = false;
    let lastScrollY = window.scrollY;

    // ─── Mobile Menu Toggle ───
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('open', isMenuOpen);
        
        const icon = navToggle.querySelector('i');
        if (isMenuOpen) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    }

    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            navLinks.classList.remove('open');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !nav.contains(e.target)) {
            closeMenu();
        }
    });

    // ─── Scroll Reveal with IntersectionObserver ───
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element position within parent
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children);
                    const siblingIndex = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${siblingIndex * 100}ms`;
                }
                
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ─── Active Section Highlighting ───
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ─── Navbar Scroll Effects ───
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for navbar styling
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (currentScrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─── Back to Top ───
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ─── Hero Scroll Indicator ───
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const featuresSection = document.getElementById('caracteristicas');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ─── Smooth Scroll for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Keyboard Navigation ───
    document.addEventListener('keydown', (e) => {
        // Close menu on Escape
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // ─── Performance: Debounced Resize Handler ───
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 767 && isMenuOpen) {
                closeMenu();
            }
        }, 150);
    });

    // ─── Initialize ───
    handleScroll();

    console.log('RACSP Landing Page loaded successfully');
})();
