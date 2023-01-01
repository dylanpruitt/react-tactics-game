import SkillType from '../../skills/SkillType';
import Utility from './Utility';

const HealNearest = (() => {

    return {
        use: (actor) => {
            let target = Utility.findNearestTarget(actor, (a, b) => a.getFaction() === b.getFaction());
            if (target === null) return;

            const healSkill = actor.getSkillType(SkillType.HEAL);
            if (healSkill === null) return;

            if (healSkill.targetIsValid(actor, { x: target.getX(), y: target.getY() }) && actor.getAP() >= healSkill.getAPCost()) {
                healSkill.use(actor, { x: target.getX(), y: target.getY() });
            } else {
                let moveTarget = Utility.findClosestTile(actor, target);
                if (moveTarget !== null) {
                    const moveSkill = actor.getSkillType(SkillType.MOVE);
                    moveSkill.use(actor, moveTarget);
                }

                if (healSkill.targetIsValid(actor, { x: target.getX(), y: target.getY() }) 
                    && actor.getAP() >= healSkill.getAPCost()) {
                    healSkill.use(actor, { x: target.getX(), y: target.getY() });
                }
            }
        }
    };
})();

export default HealNearest;