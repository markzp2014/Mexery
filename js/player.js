class Player {
    constructor() {
        this.x = 420;
        this.y = 320;

        this.width = 24;
        this.height = 32;

        this.speed = 3;

        this.keys = {};

        window.addEventListener("keydown", (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    update() {

    if (this.keys["w"]) {
        console.log("W");
        this.y -= this.speed;
    }

    if (this.keys["s"]) {
        console.log("S");
        this.y += this.speed;
    }

    if (this.keys["a"]) {
        console.log("A");
        this.x -= this.speed;
    }

    if (this.keys["d"]) {
        console.log("D");
        this.x += this.speed;
    }

    }

    draw(ctx) {

        // Голова
        ctx.fillStyle = "#ffd6b3";
        ctx.fillRect(this.x + 6, this.y, 12, 12);

        // Волосся
        ctx.fillStyle = "#4b2e1f";
        ctx.fillRect(this.x + 5, this.y, 14, 4);

        // Тіло
        ctx.fillStyle = "#2d7dff";
        ctx.fillRect(this.x + 5, this.y + 12, 14, 12);

        // Ноги
        ctx.fillStyle = "#222";
        ctx.fillRect(this.x + 5, this.y + 24, 5, 8);
        ctx.fillRect(this.x + 14, this.y + 24, 5, 8);

        // Руки
        ctx.fillStyle = "#ffd6b3";
        ctx.fillRect(this.x + 2, this.y + 13, 3, 10);
        ctx.fillRect(this.x + 19, this.y + 13, 3, 10);
    }
}

const player = new Player();
