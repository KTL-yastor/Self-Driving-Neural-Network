class Sensor{
    constructor(ship){
        this.ship = ship;
        this.rayCount = 3;
        this.rayLen = 100;
        this.raySpred = Math.PI / 4;
        this.rays = [];
    }

    update(){
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++){
            const rayAngle = lerp(
                this.raySpred/2,
                -this.raySpred/2,
                i/(this.rayCount-1)
            );

            const start = {x:this.ship.x , y:this.ship.y};
            const end = {
                x:this.ship.x - Math.sin(rayAngle+ 90 * Math.PI / 180)* this.rayLen,
                y:this.ship.y - Math.cos(rayAngle+ 90 * Math.PI / 180)* this.rayLen,
            };
            this.rays.push([start,end]);
            console.log(this.rays[0][0].x);
        }
    }
        draw(ctx){
            for (let i = 0; i < this.rayCount; i++){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "red";
                
                ctx.moveTo(
                    this.rays[i][0].x,
                    
                    this.rays[i][0].y,

                );
                ctx.lineTo(
                    this.rays[i][1].x,
                    this.rays[i][1].y
                );
            ctx.stroke();
            }
    }

}