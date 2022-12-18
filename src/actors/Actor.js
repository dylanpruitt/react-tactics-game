import Move from "../skills/Move";
import Faction from "./Faction";

const Actor = (nname, nx, ny) => {
    if (nx < 0) throw new Error("x cannot be negative");
    if (ny < 0) throw new Error("y cannot be negative");

    let name = nname;
    let x = nx;
    let y = ny;

    let hp = 10;
    let maxHP = hp;
    let attack = 0;
    let defense = 0;
    let ap = 2;
    let maxAP = ap;

    let attackModifier = 1.0;
    let defenseModifier = 1.0;

    let skills = [Move];

    let playerControlled = false;
    let faction = Faction.NEUTRAL;

    return {
        setPosition: (nx, ny) => { x = nx; y = ny; },
        getX: () => x,
        getY: () => y,

        getName: () => name,
        setName: (nname) => name = nname,

        getHP: () => hp,
        setHP: (h) => hp = h,
        getMaxHP: () => maxHP,
        setMaxHP: (h) => maxHP = h,

        getAttack: () => attack * attackModifier,
        setAttack: (a) => attack = a,
        getDefense: () => defense * defenseModifier,
        setDefense: (d) => defense = d,

        getAP: () => ap,
        getMaxAP: () => maxAP,
        setAP: (a) => ap = a,
        setMaxAP: (a) => maxAP = a,
        resetAP: () => ap = maxAP,

        getSkills: () => skills,
        addSkill: (skill) => skills.push(skill),

        playerControlled: () => playerControlled,
        setPlayerControlled: (c) => playerControlled = c,

        getFaction: () => faction,
        setFaction: (f) => {
            if (f === undefined) throw new Error("Invalid Faction for actor!");
            faction = f;
        },

        getSkillType: (type) => {
            let skillsOfType = skills.filter(s => s.type === type);

            if (skillsOfType.length === 0) return null;
            return skillsOfType[0];
        }
    };
};

export default Actor;