import Move from "../skills/Move";
import Faction from "./Faction";
import ActorType from "./ActorType";
import GameManager from "../GameManager";

import Image from "../icons/sword.png";

const Actor = (nname, nx, ny) => {
    if (nx < 0 || nx >= GameManager.BOARD_SIZE) throw new Error(`invalid actor x: ${nx}`);
    if (ny < 0 || ny >= GameManager.BOARD_SIZE) throw new Error(`invalid actor y: ${ny}`);

    let name = nname;
    let x = nx;
    let y = ny;

    let hp = 10;
    let maxHP = hp;
    let attack = 0;
    let defense = 0;
    let ap = 2;
    let maxAP = ap;

    let skills = [Move];
    let statuses = [];

    let playerControlled = false;
    let faction = Faction.NEUTRAL;

    let type = ActorType.MELEE;

    const getAttackModifier = () => statuses.reduce((total, curr) => total * curr.getAttackModifier(), 1.0);
    const getDefenseModifier = () => statuses.reduce((total, curr) => total * curr.getDefenseModifier(), 1.0);

    const hasStatus = (name) => statuses.filter(s => s.getName() === name).length > 0;
    

    return {
        setPosition: (nx, ny) => {
            if (nx < 0 || nx >= GameManager.BOARD_SIZE || ny < 0 || ny >= GameManager.BOARD_SIZE) return;
            x = nx; y = ny; 
        },
        getX: () => x,
        getY: () => y,

        getName: () => name,
        setName: (nname) => name = nname,

        getImage: () => <img src={Image} alt="actor default"></img>,

        getHP: () => hp,
        setHP: (h) => hp = h,
        getMaxHP: () => maxHP,
        setMaxHP: (h) => maxHP = h,

        getAttack: () => Math.floor(attack * getAttackModifier()),
        setAttack: (a) => attack = a,
        getDefense: () => Math.floor(defense * getDefenseModifier()),
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

        getType: () => type,
        setType: (t) => {
            if (t === undefined) throw new Error("Invalid ActorType for actor!");
            type = t;
        },

        getSkillType: (type) => {
            let skillsOfType = skills.filter(s => s.type === type);

            if (skillsOfType.length === 0) return null;
            return skillsOfType[0];
        },

        getStatuses: () => statuses,
        hasStatus: hasStatus,
        addStatus: (status) => {
            if (status === null) return;
            if (hasStatus(status.getName())) return;

            statuses.push(status);
        },
        updateStatuses: () => {
            statuses.forEach(s => s.update());
            const temp = statuses.filter(s => s.getTurnCount() > 0);
            statuses = temp.slice();
        }
    };
};

export default Actor;