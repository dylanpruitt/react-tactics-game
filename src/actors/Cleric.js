import Heal from "../skills/Heal";
import Actor from "./Actor";
import ActorType from "./ActorType";
import Faction from "./Faction";

import Image from "../icons/healer.png";

const Cleric = (nx, ny) => {
    let actor = Actor("Cleric", nx, ny);
    actor.setHP(15);
    actor.setMaxHP(15);
    actor.setAttack(0);
    actor.setDefense(0);
    actor.setType(ActorType.HEALER);
    
    actor.addSkill(Heal);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);
    actor.getImage = () => <img src={Image} alt="cleric"></img>;

    return actor;
}

export default Cleric;