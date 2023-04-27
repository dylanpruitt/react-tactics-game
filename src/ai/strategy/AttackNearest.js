import SkillType from '../../skills/SkillType';
import Utility from './Utility';

const AttackNearest = (() => {
    return {
        use: (actor) => {
            let target = Utility.findNearestTarget(actor, (a, b) => a.getFaction() !== b.getFaction());
            if (target === null) return;

            const attackSkill = actor.getSkillType(SkillType.ATTACK);
            if (attackSkill === null) return;

            if (attackSkill.targetIsValid(actor, { x: target.getX(), y: target.getY() }) && actor.getAP() >= attackSkill.getAPCost()) {
                attackSkill.use(actor, { x: target.getX(), y: target.getY() });
            } else {
                let moveTarget = Utility.findClosestTile(actor, target);
                if (moveTarget !== null) {
                    const moveSkill = actor.getSkillType(SkillType.MOVE);
                    moveSkill.use(actor, moveTarget);
                }

                if (attackSkill.targetIsValid(actor, { x: target.getX(), y: target.getY() }) && actor.getAP() >= attackSkill.getAPCost()) {
                    attackSkill.use(actor, { x: target.getX(), y: target.getY() });
                }
            }
        }
    };
})();

export default AttackNearest;