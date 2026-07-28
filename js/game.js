const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const GameState = {
    BOOT: 0,
    FADE: 1,
    ROOM: 2
};

let state = GameState.BOOT;

let pressFlash = false;
let fade = 0;
let fadeSpeed = 0.025;

document.addEventListener("keydown", () => {
    if (state !== GameState.BOOT) return;

    pressFlash = true;

    setTimeout(() => {
        pressFlash = false;
        state = GameState.FADE;
    }, 180);
});

function update() {

    if (state === GameState.FADE) {
        fade += fadeSpeed;

        if (fade >= 1) {
            fade = 1;
            state = GameState.ROOM;
        }
    }

}

function drawBoot() {

    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.textAlign = "center";

    ctx.fillStyle = "white";
    ctx.font = "40px monospace";
    ctx.fillText(
        "Mexery Engine v0.1",
        canvas.width/2,
        canvas.height/2-40
    );

    ctx.font = "26px monospace";

    ctx.fillStyle = pressFlash ? "#ff0000" : "#b00000";

    ctx.fillText(
        "Натисніть будь-яку клавішу",
        canvas.width/2,
        canvas.height/2+20
    );

    ctx.fillStyle="white";
    ctx.font="20px monospace";

    ctx.fillText(
        "© 2026 MarkoZP",
        canvas.width/2,
        canvas.height-60
    );
}

function drawRoom(){

    ctx.fillStyle="#1d1d1d";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="white";
    ctx.font="40px monospace";
    ctx.textAlign="center";

    ctx.fillText(
        "ROOM COMING SOON...",
        canvas.width/2,
        canvas.height/2
    );

}

function draw(){

    if(state===GameState.BOOT)
        drawBoot();

    else
        drawRoom();

    if(state===GameState.FADE){

        ctx.fillStyle=`rgba(0,0,0,${fade})`;
        ctx.fillRect(0,0,canvas.width,canvas.height);

    }

}

function loop(){

    update();
    draw();

    requestAnimationFrame(loop);

}

loop();
