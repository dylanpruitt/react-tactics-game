import RangedAttack from "../skills/RangedAttack";
import Actor from "./Actor";
import ActorType from "./ActorType";
import Faction from "./Faction";

const Archer = (nx, ny) => {
    let actor = Actor("Archer", nx, ny);
    actor.setHP(20);
    actor.setMaxHP(20);
    actor.setAttack(10);
    actor.setDefense(5);
    actor.setType(ActorType.RANGED);
    
    actor.addSkill(RangedAttack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Archer;