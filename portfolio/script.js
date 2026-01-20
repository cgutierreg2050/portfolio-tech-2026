document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Smooth Reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply to all cards, headers, and timeline items
    const revealElements = document.querySelectorAll('.card, .section-header, .timeline-item, .hero-content');
    revealElements.forEach(el => {
        el.classList.add('reveal-text'); // Add base class for animation
        observer.observe(el);
    });

    // 2. Typing Effect for Hero Title
    const textToType = "Kristian Gutierrez";
    const titleElement = document.querySelector('h1');
    if (titleElement) {
        titleElement.textContent = ""; // Clear initial text
        titleElement.classList.add('typing-cursor');

        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                titleElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Speed of typing
            } else {
                // Remove cursor after typing is done (optional)
                setTimeout(() => titleElement.classList.remove('typing-cursor'), 2000);
            }
        }
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // 3. 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset position smoothly
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
