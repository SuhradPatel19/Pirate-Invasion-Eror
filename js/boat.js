class Boat {
    constructor(x, y, w, h, boatPosition, animation) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.boatPosition = boatPosition
        this.animation = animation
        this.speed = 0.05


        var options = {
            isStatic: false,
        }
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options)
        World.add(world, this.body)

        this.image = loadImage("../C27-Ta-v4--main/assets/boat.png")
    }
    animate() {
        this.speed += 0.05
    }

    remove(index) {
        this.animation = brokenAnimation
        this.speed = 0.05
        this.w = 200
        this.h = 200


        setTimeout(() => {
            World.remove(world, boats[index].body)
            boats.splice(index, 1)

        }
            , 3000
        )


    }
    display() {
        var pos = this.body.position
        //console.log(pos)
        var angle = this.body.angle
        var boatIndex = floor(this.speed % this.animation.length)
        push()
        translate(pos.x, pos.y)
        rotate(angle)
        // rectMode(CENTER)
        //rect(x,y,w,h)


        imageMode(CENTER)
        image(this.animation[boatIndex], 0, this.boatPosition, this.w, this.h)

        pop()
    }
}
