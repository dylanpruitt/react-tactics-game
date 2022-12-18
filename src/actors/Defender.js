import Attack from "../skills/Attack";
import Actor from "./Actor";
import Faction from "./Faction";

const Defender = (nx, ny) => {
    let actor = Actor("Defender", nx, ny);
    actor.setHP(30);
    actor.setMaxHP(30);
    actor.setAttack(5);
    actor.setDefense(15);
    
    actor.addSkill(Attack);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);

    return actor;
}

export default Defender;