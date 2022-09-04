class Sensor{
    constructor(ship){
        this.ship = ship;
        this.rayCount = 5;
        this.rayLen = 200;
        this.raySpred = Math.PI / 2;
        this.rays = [];
        this.readings = [];
    }

    update(spaceBorders){
        this.#castRays();
        this.readings = [];
        for (let i = 0; i<this.rays.length; i++){
            this.readings.push(
                this.#getReading(this.rays[i], spaceBorders)
            );
        }
    }


    #getReading(ray, spaceBorders){
        let touches = [];
        for(let i = 0 ; i < spaceBorders.length; i++) {
            
        
        const touch = getIntersection(
            ray [ 0 ],
            ray [ 1 ],
            spaceBorders [ i ] [ 0 ],
            spaceBorders [ i ] [ 1 ],
        ) ;
        if ( touch ) {
            touches.push ( touch );
        }
        }
        if (touches.length == 0) {
           return null ;
        }
        else {
            const offsets=touches.map( e => e.offset);
            const minOffset = Math.min( ...offsets);
            return touches.find ( e => e.offset == minOffset);

        }
    }  

    #castRays(){
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++){
            const rayAngle = lerp(
                this.raySpred/2,
                -this.raySpred/2,
                i/(this.rayCount-1)
            )+ this.ship.angle;

            const start = {x:this.ship.x , y:this.ship.y};
            const end = {
                x:this.ship.x - Math.sin(rayAngle+ 90 * Math.PI / 180)* this.rayLen,
                y:this.ship.y - Math.cos(rayAngle+ 90 * Math.PI / 180)* this.rayLen,
            };
            this.rays.push([start,end]);
            //console.log(this.rays[0][0].x);
        }
    }
    draw(ctx){
        for (let i = 0; i < this.rayCount; i++){
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            
            ctx.moveTo(
                this.rays[i][0].x,
                
                this.rays[i][0].y,

            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();




        }
    }

}