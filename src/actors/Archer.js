import RangedAttack from "../skills/RangedAttack";
import Actor from "./Actor";
import Faction from "./Faction";

const Archer = (nx, ny) => {
    let actor = Actor("Archer", nx, ny);
    actor.setHP(20);
    actor.setMaxHP(20);
    actor.setAttack(10);
    actor.setDefense(5);
    
    actor.addSkill(RangedAttack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Archer;