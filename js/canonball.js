
class Canonball {
    constructor(x, y, r,) {
        this.image = loadImage("../C27-Ta-v4--main/assets/cannonball.png")
        this.x = x
        this.y = y
        this.r = r
        this.speed = 0.05
        this.isSink = false
        this.animation = [this.image]
        var options = {
            isStatic: true,
            restititution: 0.45,
            density: 1.0,
            friction: 1.0,
        }

        this.body = Bodies.circle(this.x, this.y, this.r, options)
        World.add(world, this.body)




        this.trajectry = []



    }
    

    shoot() {

        //p5.Vector.fromAngle(angle, [length])
        var velocity = p5.Vector.fromAngle(MyCanon.angle)
        //console.log(velocity.mult())
        velocity.mult(20)
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y })
    }

    animate() {
        this.speed += 0.05
    }
    remove(index) {
        this.animation = waterAnimation
        this.speed = 0.05
        this.r = 150
        this.isSink = true
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 })


        setTimeout(() => {
            World.remove(world, this.body)
            balls.splice(index, 1)

        }
            , 3000
        )



    }

    display() {
        var pos = this.body.position
        //console.log(pos)
        var angle = this.body.angle
        var ballIndex = floor(this.speed % this.animation.length)

        push()
        translate(pos.x, pos.y)
        rotate(angle)
        imageMode(CENTER)
        //rect(x,y,w,h)
        // image(this.animation[ballIndex], 0, 0, this.r, this.r)
        image(this.animation[ballIndex],0,0,this.r,this.r)
        pop()

        if (this.body.position.x > 180 && this.body.velocity.x > 0 && !this.isSink) {
            var position = [this.body.position.x, this.body.position.y]
            this.trajectry.push(position)
        }

        for (var i = 0; i < this.trajectry.length; i++) {
            image(this.image, this.trajectry[i][0], this.trajectry[i][1], 5, 5)

        }

    }
}
