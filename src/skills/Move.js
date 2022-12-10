import GameManager from "../GameManager";
import Log from '../Log';
import SkillType from "./SkillType";

const Move = (() => {
    
    const targetIsValid = (user, target) => {
        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance < user.getAP() && GameManager.getActorAt(target.x, target.y) === null;
    }

    return {
        name: "Move",
        type: SkillType.MOVE,
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
            user.setAP(user.getAP() - Math.floor(distance));
            user.setPosition(target.x, target.y);

            Log.log(`${user.getName()} moves to (${target.x},${target.y}).`);
        },
    };
})();

export default Move;