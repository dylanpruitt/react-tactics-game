import Attack from "../skills/Attack";
import WarcrySkill from "../skills/WarcrySkill";
import Actor from "./Actor";
import Faction from "./Faction";

import Image from "../icons/commander.png";

const Commander = (nx, ny) => {
    let actor = Actor("Commander", nx, ny);
    actor.setHP(40);
    actor.setMaxHP(40);
    actor.setAttack(10);
    actor.setDefense(10);
    
    actor.addSkill(Attack);
    actor.addSkill(WarcrySkill);
    actor.setPlayerControlled(false);
    actor.setFaction(Faction.ENEMY);
    actor.getImage = () => <img src={Image} alt="commander"></img>;

    return actor;
}

export default Commander;