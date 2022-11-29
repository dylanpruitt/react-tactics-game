class Skill {
    constructor(name) {
        this.name = name;
    }

    use = (user, target) => {
        if (!this.targetIsValid(user, target)) return;
    }

    targetIsValid = (user, target) => { return true; }
}

class Attack extends Skill {
    constructor() {
        super("Attack");
    }

    use = (user, target) => {
        if (!this.targetIsValid(user, target)) return;
        
        console.log(`${user.name} attacks ${target.name}!`);
    }

    targetIsValid = (user, target) => {
        if (user   === null) throw new Error("user cannot be null");
        if (target === null) throw new Error("target cannot be null");
        return user.x === target.x;
    }
}

module.exports = Attack, Skill;