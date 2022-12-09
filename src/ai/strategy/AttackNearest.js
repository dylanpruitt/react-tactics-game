import GameManager from '../../GameManager';
import SkillType from '../../skills/SkillType';

const AttackNearest = (() => {
    const findNearestTarget = (actor) => {
        let closestActor = null;
        let closestDistance = 100000;

        GameManager.retrieveAllActors().forEach(a => {
            let distance = Math.sqrt(Math.pow(actor.getX() - a.getX(), 2) + Math.pow(actor.getY() - a.getY(), 2));
            if (distance < closestDistance && actor.getFaction() !== a.getFaction()) {
                closestActor = a;
                closestDistance = distance;
            }
        });

        return closestActor;
    }

    return {
        use: (actor) => {
            let target = findNearestTarget(actor);
            if (target === null) return;

            let distance = Math.sqrt(Math.pow(actor.getX() - target.getX(), 2) + Math.pow(actor.getY() - target.getY(), 2));

            if (distance > 1 && actor.getAP() >= 1) {
                const xOffset = actor.getX() > target.getX() ? -1 : 1;
                const yOffset = actor.getY() > target.getY() ? -1 : 1;

                const moveSkill = actor.getSkillType(SkillType.MOVE);
                moveSkill.use(actor, { x: actor.getX() + xOffset, y: actor.getY() + yOffset });
            }

            distance = Math.sqrt(Math.pow(actor.getX() - target.getX(), 2) + Math.pow(actor.getY() - target.getY(), 2));

            const attackSkill = actor.getSkillType(SkillType.ATTACK);
            if (attackSkill === null) return;
            if (attackSkill.targetIsValid(actor, { x: target.getX(), y: target.getY() }) && actor.getAP() >= 1) {
                attackSkill.use(actor, { x: target.getX(), y: target.getY() });
            }
        }
    };
})();

export default AttackNearest;