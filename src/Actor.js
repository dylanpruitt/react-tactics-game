class Actor {
    constructor(name, x, y) {
        if (x < 0) throw new Error("x cannot be negative");
        if (y < 0) throw new Error("y cannot be negative");

        this.name = name;
        this.x    = x;
        this.y    = y;
    }

    setPosition = (x, y) => { this.x = x; this.y = y; }
}

module.exports = Actor;