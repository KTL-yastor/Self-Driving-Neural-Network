const canvas = document.getElementById("myCanvas");

canvas.height = 300;


const ctx = canvas.getContext("2d");
const space = new Space(canvas.height/2, canvas.height);
const ship = new Ship(800, space.getLaneCenter(1), 50, 30);


animate();

function animate(){
    ship.update(space.borders);
    canvas.width = window.innerWidth;

    ctx.save();
    //animacja drogi
    ctx.translate(-ship.x+canvas.width*0.8, 0);

    space.draw(ctx);
    ship.draw(ctx);
    ctx.restore();
    //console.log(space.getLaneCenter(1));
    requestAnimationFrame(animate);
}
