class Tower {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        var options = {
            isStatic: true,
        }

        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options)
        World.add(world, this.body)

        this.image = loadImage("../C27-Ta-v4--main/assets/tower.png")

    }

    display() {
        var pos = this.body.position
        //console.log(pos)
        var angle = this.body.angle

        push()
        translate(pos.x, pos.y)
        rotate(angle)
        // rectMode(CENTER)
        //rect(x,y,w,h)

        //this.image(loadImageName,x,y,w,h)
        //rect(0, 0, this.w, this.h)

        imageMode(CENTER)
        image(this.image, 0, 0, this.w, this.h)


        pop()
    }
}
