import AoESkill from "../skills/AoESkill";
import Actor from "./Actor";
import Faction from "./Faction";

const Mortar = (nx, ny) => {
    let actor = Actor("Mortar", nx, ny);
    actor.setHP(10);
    actor.setMaxHP(10);
    actor.setAttack(10);
    actor.setDefense(0);
    
    actor.addSkill(AoESkill);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Mortar;