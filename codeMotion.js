// Canvas Declaration

const canvas = document.querySelector("canvas");

cw = canvas.width = window.innerWidth;
ch = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

//variable

const colors = [
    "#191C23",
    "#BB0A1E",
    "#6F777D",
    "#732441",

];

const elements = [];

const mouse = {
    x: null,
    y: null
}

// drawing a circle 

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.distanceFromCenter = Math.random() * (120 - 50 + 1) + 50;
        this.lastMouse = {
            x: x,
            y: y
        }
    }

    draw(lastPoint) {
        ctx.beginPath();
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath()
    };

    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        };

        // Move elements over time

        this.radians += this.velocity;

        // Drag effect

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //Circular Motion

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);

    }
}

// corlors

const randomColors = () => {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Elements creating

const init = () => {
    for (let i = 0; i < 50; i++) {
        const radius = Math.random() * 2 + 1
        elements.push(new Circle(cw / 2, ch / 2, radius, randomColors()))
    }
}

// Interactivity

const animate = () => {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    ctx.fillRect(0, 0, cw, ch);
    elements.forEach((element) => element.update());
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

//Resize window

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
// Function call

init()
animate()