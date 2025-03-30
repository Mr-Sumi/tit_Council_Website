class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.decay = 0.015;
        this.size = Math.random() * 4 + 2;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.y += 0.1; // gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }
}

class Celebration {
    constructor() {
        this.canvas = document.getElementById('celebrationCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#4ecdc4', '#ff3366', '#FFD700', '#FF69B4', '#00FF00'];
        this.isActive = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles(x, y) {
        for (let i = 0; i < 100; i++) {
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.particles.push(new Particle(x, y, color));
        }
    }

    animate() {
        if (this.particles.length === 0) {
            this.isActive = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }

        requestAnimationFrame(() => this.animate());
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw(this.ctx);
            }
        });
    }

    start(x, y) {
        this.createParticles(x, y);
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }
}

// Initialize celebration
document.addEventListener('DOMContentLoaded', () => {
    const celebration = new Celebration();
    const button = document.getElementById('celebrationButton');

    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create multiple bursts
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                celebration.start(x, y);
            }, i * 200);
        }

        // Add button pulse effect
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
}); 