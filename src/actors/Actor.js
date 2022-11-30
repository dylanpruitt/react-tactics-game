Actor = (name, x, y) => {
    if (x < 0) throw new Error("x cannot be negative");
    if (y < 0) throw new Error("y cannot be negative");
    return {
        name: name,
        x: x,
        y: y,

        hp: 1,
        attack: 0,
        defense: 0,
        speed: 0,

        attackModifier: 1.0,
        defenseModifier: 1.0,
        speedModifier: 1.0,

        setPosition: (x, y) => { x = x; y = y; },
        getAttack: () => { attack * attackModifier }
    };
};
