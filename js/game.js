const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const State = {
    BOOT: 0,
    FADE: 1,
    ROOM: 2
};

let state = State.BOOT;

let startTime = performance.now();
let flash = false;
let fade = 0;
let keyPressed = false;

document.addEventListener("keydown", () => {

    if (keyPressed) return;
    if (state !== State.BOOT) return;

    keyPressed = true;
    flash = true;

    setTimeout(() => {
        flash = false;
        state = State.FADE;
    },150);

});

function update(){

    if(state===State.FADE){

        fade+=0.02;

        if(fade>=1){

            fade=1;
            state=State.ROOM;

        }

    }

}

function drawBoot(){

    const t=(performance.now()-startTime)/1000;

    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.textAlign="center";

    //----------------------------------
    // Mexery Engine
    //----------------------------------

    let logoAlpha=0;

    if(t>0.3){

        logoAlpha=Math.min((t-0.3)/0.4,1);

    }

    ctx.fillStyle=`rgba(255,255,255,${logoAlpha})`;
    ctx.font="42px monospace";

    ctx.fillText(
        "Mexery Engine v0.1",
        canvas.width/2,
        canvas.height/2-60
    );

    //----------------------------------
    // Author
    //----------------------------------

    let authorAlpha=0;

    if(t>0.8){

        authorAlpha=Math.min((t-0.8)/0.4,1);

    }

    ctx.fillStyle=`rgba(255,255,255,${authorAlpha})`;
    ctx.font="20px monospace";

    ctx.fillText(
        "© 2026 MarkoZP",
        canvas.width/2,
        canvas.height-70
    );

    //----------------------------------
    // Press Any Key
    //----------------------------------

    if(t>1.3){

        let pulse=(Math.sin(performance.now()/300)+1)/2;

        let r=90+Math.floor(pulse*90);

        if(flash){

            ctx.fillStyle="#ff0000";

        }else{

            ctx.fillStyle=`rgb(${r},0,0)`;

        }

        ctx.font="28px monospace";

        ctx.fillText(
            "Натисніть будь-яку клавішу",
            canvas.width/2,
            canvas.height/2+20
        );

    }

}

function drawRoom(){

    ctx.fillStyle="#1a1a1a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#444";
    ctx.fillRect(0,canvas.height*0.75,canvas.width,canvas.height*0.25);

    ctx.fillStyle="#8b5a2b";
    ctx.fillRect(canvas.width/2-60,canvas.height/2-30,120,60);

    ctx.fillStyle="#222";
    ctx.fillRect(canvas.width/2-40,canvas.height/2-25,80,45);

    ctx.fillStyle="rgba(255,255,255,0.5)";
    ctx.font="16px monospace";
    ctx.textAlign="left";

    ctx.fillText(
        "Mexery Engine v0.1",
        20,
        canvas.height-20
    );

    player.update();
    player.draw(ctx);
    
}

function draw(){

    if(state===State.BOOT){

        drawBoot();

    }else{

        drawRoom();

    }

    if(state===State.FADE){

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
