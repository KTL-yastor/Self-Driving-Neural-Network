class Ship{
    constructor(x , y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.5;
        this.maxSpeed = 5;
        this.friction = 0.05;
        //do skręcania
        this.angle = 0;

        this.sensor = new Sensor(this);

        this.controls = new Controls();
    }
    // przyspieszenie i spowalnianie po puszczeniu klawisza
    update(spaceBorders){

        this.#move();   
        this.sensor.update(spaceBorders);
    }
    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }

    #move(){
        if (this.controls.left){
            this.speed += this.acceleration;
        }
        if (this.controls.right){
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed/1.5){
            this.speed = -this.maxSpeed/1.5;
        }
        //this.x -= this.speed;
        if (this.speed > 0)
        {
            this.speed -= this.friction;
        }
        if (this.speed < 0)
        {
            this.speed += this.friction;
        }
        //aby faktycznie sie zatrzymal
        if (Math.abs(this.speed) < this.friction)
        {
            this.speed = 0;
        }

        //wykrywanie czy jedzie do przodu czy do tyłu
        //by odwrócić sterowanie aby było bardziej naturalne
        if (this.speed != 0)
        {
            const flip = this.speed>0?1:-1;
        

            if (this.controls.forward){
                this.angle-=0.03*flip;
            }
            if (this.controls.reverse){
                this.angle+=0.03*flip;
            }
        }
        this.x -=(Math.sin(this.angle + 90 * Math.PI / 180))*this.speed;
        this.y -=(Math.cos(this.angle + 90 * Math.PI / 180))*this.speed;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();

        this.sensor.draw(ctx);
    }
}