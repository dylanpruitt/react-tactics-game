import GameManager from '../GameManager';
import Log from '../Log';
import SkillType from './SkillType';

const RangedAttack = (() => {
    const RANGE   = 3;
    const AP_COST = 2;

    const targetIsValid = (user, target) => {
        if (user === null) throw new Error("user cannot be null");
        if (target === null) throw new Error("target cannot be null");

        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance <= RANGE && GameManager.getActorAt(target.x, target.y) !== null && user.getAP() >= AP_COST
            && GameManager.getActorAt(target.x, target.y).getFaction() !== user.getFaction();
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

            let damage = user.getAttack();
            actor.setHP(actor.getHP() - damage);
            Log.log(`${actor.getName()} took ${user.getAttack()} damage!`);

            let targetAttack = actor.getSkillType(SkillType.ATTACK);

            if (targetAttack !== null && targetAttack.targetIsValid(actor, {x: user.getX(), y: user.getY()})) {
                user.setHP(user.getHP() - actor.getDefense());
                if (actor.getDefense() > 0) Log.log(`${user.getName()} took ${actor.getDefense()} damage!`);
            }
        },
        getAPCost: () => AP_COST,
    };
})();

export default RangedAttack;