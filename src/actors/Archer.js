import RangedAttack from "../skills/RangedAttack";
import Actor from "./Actor";
import ActorType from "./ActorType";
import Faction from "./Faction";

import Image from "../icons/bow.png";

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
    actor.getImage = () => <img src={Image} alt="archer"></img>;
    
    return actor;
}

export default Archer;