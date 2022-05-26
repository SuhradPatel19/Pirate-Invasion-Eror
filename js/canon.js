
class Canon {
    constructor(x, y, w, h, angle) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.angle = angle

        this.canonImage = loadImage("../C27-Ta-v4--main/assets/CANON.png")
        this.cannonBaseimage = loadImage("../C27-Ta-v4--main/assets/cannon_base.png")

        var options = {
            isStatic: true,
        }

        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options)
        World.add(world, this.body)

    }
    display() {
        var pos = this.body.position
        //console.log(pos)
        var angle = this.body.angle

        if (keyIsDown(LEFT_ARROW) && this.angle >= -1.2) {
            this.angle -= 0.02


        }
        //console.log(this.angle)
        if (keyIsDown(RIGHT_ARROW) && this.angle <= 1.5) {
            this.angle += 0.02


        }

        push()
        translate(pos.x, pos.y)
        rotate(this.angle)
        // rectMode(CENTER)
        // //rect(x,y,w,h)
        // rect(0, 0, this.w, this.h)

        imageMode(CENTER)
        image(this.canonImage,0,0,this.w,this.h)
        pop()

        push()
        imageMode(CENTER)
        image(this.cannonBaseimage,130,60,220,220)
        pop()

        // arc(120, 150, 150, 200, PI, TWO_PI)
    }
}
