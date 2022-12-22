import Warcry from "../statuses/Warcry";
import GameManager from '../GameManager';
import Log from '../Log';
import SkillType from './SkillType';

const WarcrySkill = (() => {
    const AP_COST = 2;

    const targetIsValid = (user, target) => {
        if (user === null) throw new Error("user cannot be null");
        if (target === null) throw new Error("target cannot be null");
        
        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance === 1 && GameManager.getActorAt(target.x, target.y) !== null && user.getAP() >= AP_COST;
    };

    return {
        name: "Warcry",
        type: SkillType.BUFF,
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            user.setAP(user.getAP() - AP_COST);

            let actor = GameManager.getActorAt(target.x, target.y);
            Log.log(`${user.getName()} used Warcry on ${actor.getName()}!`);

            actor.addStatus(Warcry());
        },
        getAPCost: () => AP_COST,
    };
})();

export default WarcrySkill;