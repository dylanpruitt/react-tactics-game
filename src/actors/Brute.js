import Attack from "../skills/Attack";
import Actor from "./Actor";
import Faction from "./Faction";

const Brute = (nx, ny) => {
    let actor = Actor("Brute", nx, ny);
    actor.setHP(3);
    actor.setMaxHP(3);
    actor.setAttack(2);
    actor.setDefense(0);
    
    actor.addSkill(Attack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Brute;