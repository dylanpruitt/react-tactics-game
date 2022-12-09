import Attack from "../skills/Attack";
import Actor from "./Actor";
import Faction from "./Faction";

const Horseman = (nx, ny) => {
    let actor = Actor("Horseman", nx, ny);
    actor.setHP(3);
    actor.setMaxHP(3);
    actor.setAttack(1);
    actor.setDefense(0);
    actor.setAP(4);
    actor.setMaxAP(4);
    
    actor.addSkill(Attack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Horseman;