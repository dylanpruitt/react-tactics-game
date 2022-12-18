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

    const findClosestTile = (actor, target) => {
        if (actor === null) throw new Error("actor cannot be null");
        if (target === null) throw new Error("target cannot be null");

        const RANGE = actor.getAP();
        const moveSkill = actor.getSkillType(SkillType.MOVE);

        let closest = null;
        let closestDistance = 100000;

        for (let i = -RANGE; i < RANGE + 1; i++) {
            for (let j = -RANGE; j < RANGE + 1; j++) {
                let nx = actor.getX() + i;
                let ny = actor.getY() + j;
                let distance = Math.sqrt(Math.pow(target.getX() - nx, 2) + Math.pow(target.getY() - ny, 2));

                if (distance < closestDistance && moveSkill.targetIsValid(actor, { x: nx, y: ny })) {
                    closestDistance = distance;
                    closest = { x: nx, y: ny };
                }
            }
        }

        return closest;

    }

    return {
        use: (actor) => {
            let target = findNearestTarget(actor);
            if (target === null) return;

            const attackSkill = actor.getSkillType(SkillType.ATTACK);
            if (attackSkill === null) return;

            if (attackSkill.targetIsValid(actor, { x: target.getX(), y: target.getY() }) && actor.getAP() >= attackSkill.getAPCost()) {
                attackSkill.use(actor, { x: target.getX(), y: target.getY() });
            } else {
                let moveTarget = findClosestTile(actor, target);
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