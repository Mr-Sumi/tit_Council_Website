// Scroll Trigger Implementation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const events = document.querySelectorAll('.event');
    const joinSection = document.querySelector('.join-section');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for events within visible sections
                if (entry.target.classList.contains('section')) {
                    const events = entry.target.querySelectorAll('.event');
                    events.forEach((event, index) => {
                        setTimeout(() => {
                            event.classList.add('visible');
                        }, index * 200); // 200ms delay between each event
                    });
                }
            }
        });
    }, options);

    // Observe sections
    sections.forEach(section => observer.observe(section));
    
    // Observe join section
    if (joinSection) observer.observe(joinSection);

    // Add hover effect for events
    events.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        event.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});