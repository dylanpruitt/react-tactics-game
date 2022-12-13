import GameManager from '../GameManager';
import Log from '../Log';
import SkillType from './SkillType';

const Attack = (() => {
    const AP_COST = 1;

    const targetIsValid = (user, target) => {
        if (user === null) throw new Error("user cannot be null");
        if (target === null) throw new Error("target cannot be null");

        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance === 1 && GameManager.getActorAt(target.x, target.y) !== null && user.getAP() >= AP_COST;
    };

    return {
        name: "Attack",
        type: SkillType.ATTACK,
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            user.setAP(user.getAP() - AP_COST);

            let actor = GameManager.getActorAt(target.x, target.y);
            Log.log(`${user.getName()} attacks ${actor.getName()}!`);
            
            let damage = user.getAttack() - actor.getDefense();
            actor.setHP(actor.getHP() - damage);
        },
        getAPCost: () => AP_COST,
    };
})();

export default Attack;