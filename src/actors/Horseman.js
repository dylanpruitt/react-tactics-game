import Attack from "../skills/Attack";
import Actor from "./Actor";
import ActorType from "./ActorType";
import Faction from "./Faction";

const Horseman = (nx, ny) => {
    let actor = Actor("Horseman", nx, ny);
    actor.setHP(25);
    actor.setMaxHP(25);
    actor.setAttack(10);
    actor.setDefense(5);
    actor.setAP(4);
    actor.setMaxAP(4);
    actor.setType(ActorType.CAVALRY);
    
    actor.addSkill(Attack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Horseman;