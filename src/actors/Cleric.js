import Heal from "../skills/Heal";
import Actor from "./Actor";
import Faction from "./Faction";

const Cleric = (nx, ny) => {
    let actor = Actor("Cleric", nx, ny);
    actor.setHP(15);
    actor.setMaxHP(15);
    actor.setAttack(0);
    actor.setDefense(0);
    
    actor.addSkill(Heal);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Cleric;