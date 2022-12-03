import RangedAttack from "../skills/RangedAttack";
import Actor from "./Actor";
import Faction from "./Faction";

const Archer = (nx, ny) => {
    let actor = Actor("Archer", nx, ny);
    actor.setHP(2);
    actor.setMaxHP(2);
    actor.setAttack(1);
    actor.setDefense(0);
    
    actor.addSkill(RangedAttack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Archer;