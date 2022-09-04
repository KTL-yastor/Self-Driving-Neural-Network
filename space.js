class Space{
    constructor(y, hight, lanes = 3){
        this.y = y;
        this.hight = hight;
        this.lanes = lanes;

        this.up = y - hight/2;
        this.down = y + hight/2;

        const infinity = 100000;

        this.left = -infinity;
        this.rigth = infinity;

        const topLeft = {x:this.left, y:this.up}
        const topRight = {x:this.rigth, y:this.up}
        const botLeft = {x:this.left, y:this.down}
        const botRight = {x:this.rigth, y:this.down}

        this.borders = [
            [topLeft, topRight],
            [botLeft, botRight]
        ];
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.hight/this.lanes;
        return this.up + laneWidth / 2 + 
        Math.min(laneIndex, this.lanes - 1)*laneWidth;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "yellow";
        
        for (let i = 1; i <= this.lanes - 1; i++){
            const x = lerp(
                this.up,
                this.down,
                i/this.lanes
            );

           
            ctx.setLineDash([10,50]);
            ctx.beginPath();
            ctx.moveTo(this.left, x);
            ctx.lineTo(this.rigth, x);
            ctx.stroke();

        }
        ctx.setLineDash([]);
        this.borders.forEach(border =>{
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });

    }
}

