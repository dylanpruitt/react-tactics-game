import Attack from "../skills/Attack";
import Actor from "./Actor";
import Faction from "./Faction";

const Brute = (nx, ny) => {
    let actor = Actor("Brute", nx, ny);
    actor.setHP(30);
    actor.setMaxHP(30);
    actor.setAttack(15);
    actor.setDefense(10);
    
    actor.addSkill(Attack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Brute;