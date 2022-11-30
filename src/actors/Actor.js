import Move from "../skills/Move";

const Actor = (nname, nx, ny) => {
    if (nx < 0) throw new Error("x cannot be negative");
    if (ny < 0) throw new Error("y cannot be negative");

    let name = nname;
    let x = nx;
    let y = ny;

    let hp = 1;
    let maxHP = hp;
    let attack = 0;
    let defense = 0;
    let speed = 0;
    let ap = 2;
    let maxAP = ap;

    let attackModifier = 1.0;
    let defenseModifier = 1.0;
    let speedModifier = 1.0;

    let skills = [Move];

    return {
        setPosition: (nx, ny) => { x = nx; y = ny; },
        getX: () => { return x; },
        getY: () => { return y; },

        getName: () => { return name; },

        getHP: () => { return hp; },
        setHP: (h) => { hp = h; },
        getMaxHP: () => { return maxHP; },
        setMaxHP: (h) => { maxHP = h; },

        getAttack: () => { return attack * attackModifier },
        setAttack: (a) => { attack = a; },
        getDefense: () => { return defense * defenseModifier },
        setDefense: (d) => { defense = d; },
        getSpeed: () => { return speed * speedModifier },
        setSpeed: (s) => { speed = s; },

        getAP: () => { return ap; },
        setAP: (a) => { ap = a; },
        resetAP: () => { ap = maxAP; },

        getSkills: () => { return skills; },
        addSkill: (skill) => { skills.push(skill); }
    };
};

export default Actor;