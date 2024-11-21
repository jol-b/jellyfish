const particles = [];
const numOfParticles = 200;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);

    for (let i = 0; i < numOfParticles; i++) {
        particles[i] = new Particle(random(width), random(height));
    }
}

function draw() {
    background(210, 30, 10, 1);
    let mouseXForce = map(mouseX, 0, width, -0.2, 0.2);
    let mouseYForce = map(mouseY, 0, height, -0.2, 0.2);

    particles.forEach(p => {
        p.update(mouseXForce, mouseYForce);
        p.display();
    });
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = random(5, 15);
        this.hue = random(200, 260);
    }

    update(xForce, yForce) {
        this.acc.set(xForce, yForce);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(3);
        this.edges();
    }

    display() {
        fill(this.hue, 80, 100, 80);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    edges() {
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }
}
