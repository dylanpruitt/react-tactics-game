import AoESkill from "../skills/AoESkill";
import Actor from "./Actor";
import ActorType from "./ActorType";
import Faction from "./Faction";

import Image from "../icons/artillery.png";

const Mortar = (nx, ny) => {
    let actor = Actor("Mortar", nx, ny);
    actor.setHP(10);
    actor.setMaxHP(10);
    actor.setAttack(10);
    actor.setDefense(0);
    actor.setType(ActorType.RANGED_AOE);
    
    actor.addSkill(AoESkill);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);
    actor.getImage = () => <img src={Image} alt="mortar"></img>;

    return actor;
}

export default Mortar;