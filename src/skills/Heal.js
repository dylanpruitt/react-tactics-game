import GameManager from '../GameManager';
import Log from '../Log';
import SkillType from './SkillType';

const Heal = (() => {
    const AP_COST = 2;

    const targetIsValid = (user, target) => {
        if (user === null) throw new Error("user cannot be null");
        if (target === null) throw new Error("target cannot be null");

        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance === 1 && GameManager.getActorAt(target.x, target.y) !== null && user.getAP() >= AP_COST
            && GameManager.getActorAt(target.x, target.y).getFaction() === user.getFaction();
    };

    return {
        name: "Heal",
        type: SkillType.HEAL,
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            user.setAP(user.getAP() - AP_COST);

            let actor = GameManager.getActorAt(target.x, target.y);
            Log.log(`${user.getName()} heals ${actor.getName()}!`);
            
            let healAmount = 15;
            actor.setHP(actor.getHP() + healAmount);
            if (actor.getHP() > actor.getMaxHP()) actor.setHP(actor.getMaxHP());
        },
        getAPCost: () => AP_COST,
    };
})();

export default Heal;