import Faction from "./actors/Faction";
import Log from "./Log";
import AIController from "./ai/AIController";

const GameManager = (() => {
    let actors = [];
    let objectives = [];
    let hint = null;
    let aiController = AIController(Faction.ENEMY);

    const addActor = (actor) => {
        if (actor === null || actor === undefined) throw new Error("actor cannot be null or undefined");
        if (getActorAt(actor.getX(), actor.getY()) !== null) throw new Error("another actor is already at this x, y");
        
        let actorsWithSameName = actors.filter((a) => a.getName().includes(actor.getName())).length;
        if (actorsWithSameName > 0) {
            actor.setName(`${actor.getName()} ${"ABCDEGHIJKLMNOPQRSTUVWXYZ"[actorsWithSameName]}`);
        }

        actors.push(actor);
    }

    const getActorAt = (x, y) => {
        let actorAtPosition = null;
        actors.forEach((actor) => {
            if (actor.getX() === x && actor.getY() === y) actorAtPosition = actor;
        });

        return actorAtPosition;
    }

    const removeActors = (predicate) => {
        let remainingActors = [];
        actors.forEach((actor) => {
            if (!predicate(actor))
                remainingActors.push(actor);
        });

        actors = remainingActors;
    }

    const addObjective = (objective) => {
        if (objective === null || objective === undefined) throw new Error("objective cannot be null or undefined");
        objectives.push(objective);
    }

    return {
        retrieveActors: (predicate) => {
            try {
                return actors.filter((actor) => predicate(actor));
            } catch (error) {
                console.log(`${error.name} : ${error.message}`);
                return [];
            }
        },
        retrieveAllActors: () => {
            return actors;
        },
        getActorAt: getActorAt,
        addActor: addActor,
        addPlayerActor: (actor) => {
            actor.setFaction(Faction.PLAYER);
            actor.setPlayerControlled(true); 
            addActor(actor);
        },
        addActors: (newActors) => {
            if (newActors === null || newActors === undefined) throw new Error("newActors cannot be null or undefined");
            newActors.forEach((actor) => {
                addActor(actor);
            });
        },
        removeActors: removeActors,
        addObjective: addObjective,
        objectivesComplete: () => {
            let complete = true;
            objectives.forEach((objective) => {
                if (objective.fail() || !objective.complete()) complete = false;
            });
            return complete;
        },
        objectivesFailed: () => {
            let failed = false;
            objectives.forEach((objective) => {
                if (objective.fail()) failed = true;
            });
            return failed;
        },
        getObjectives: () => objectives,
        setupLevel: (level) => {
            actors = [];
            objectives = [];
            Log.clear();
            aiController.reset();
            level.setup();
        },
        setHint: (h) => hint = h,
        getHint: () => hint,
        getAIController: () => aiController,
        BOARD_SIZE: 15,
    };
})();

export default GameManager;