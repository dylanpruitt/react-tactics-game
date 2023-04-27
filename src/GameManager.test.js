import GameManager from "./GameManager";
import Actor from "./actors/Actor";
import Brute from "./actors/Brute";
import Faction from "./actors/Faction";
import Objective from "./Objective";

const Clara = (x, y) => {
    let obj = Actor("Clara", x, y);
    obj.setHP(11);
    obj.setMaxHP(11);
    return obj;
}

let TEST_ACTORS = [
    Actor("Ray", 1, 1),
    Actor("Dylan", 3, 1),
    Clara(1, 2),
    Clara(4, 1),
];

test("removeActors removes all actors for true predicate", () => {
    GameManager.addActors(TEST_ACTORS);
    GameManager.removeActors((actor) => true);
    let result = GameManager.retrieveActors((actor) => true);
    expect(result).toEqual([]);
});

test("removeActors removes correct actors for predicate", () => {
    GameManager.addActors(TEST_ACTORS);
    const expected = [
        Actor("Ray", 1, 1),
        Actor("Dylan", 3, 1),
    ];
    GameManager.removeActors((actor) => actor.getHP() > 10);
    let result = GameManager.retrieveActors((actor) => true);
    expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(expected));

    GameManager.removeActors((actor) => true);
});

test("retrieveActors returns empty array for null predicate", () => {
    GameManager.addActors(TEST_ACTORS);
    expect(GameManager.retrieveActors(null)).toEqual([]);

    GameManager.removeActors((actor) => true);
});

test("retrieveActors returns correct actors for filter", () => {
    GameManager.addActors(TEST_ACTORS);
    const expected = [
        Clara(1, 2),
        Clara(4, 1),
    ];

    let result = GameManager.retrieveActors((a) => a.getHP() > 10);
    expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(expected));

    GameManager.removeActors((actor) => true);
});

test("addActors throws error for null newActors object", () => {
    expect(() => GameManager.addActors(null)).toThrow(Error("newActors cannot be null or undefined"));
});

test("addActor throws error for null actor", () => {
    expect(() => GameManager.addActor(null).toThrow(Error("actor cannot be null or undefined")));
});

test("addActor throws error for duplicate position", () => {
    const TEST_ACTOR = Actor("test", 1, 1);
    GameManager.addActor(TEST_ACTOR);
    expect(() => GameManager.addActor(TEST_ACTOR)).toThrow(Error("another actor is already at this x, y"));

    GameManager.removeActors((actor) => true);
    console.log(GameManager.retrieveAllActors());
});

test("addActors adds new actor", () => {
    const TEST_ACTOR = Actor("Raymond", 1, 1);
    GameManager.addActor(TEST_ACTOR);

    const ACTORS = GameManager.retrieveActors((actor) => true);
    expect(ACTORS.length).toBe(1);
    expect(ACTORS[0]).toEqual(TEST_ACTOR);

    GameManager.removeActors((actor) => true);
});

test("addPlayerActor adds new actor on player team", () => {
    const TEST_ACTOR = Actor("Raymond", 1, 1);
    GameManager.addPlayerActor(TEST_ACTOR);

    const ACTORS = GameManager.retrieveActors((actor) => actor.getFaction() === Faction.PLAYER && actor.playerControlled());
    expect(ACTORS.length).toBe(1);
    expect(ACTORS[0]).toEqual(TEST_ACTOR);

    GameManager.removeActors((actor) => true);
});

test("setupLevel cleans up existing actors and objectives", () => {
    GameManager.addActor(Brute(1, 1));
    GameManager.addActor(Brute(2, 1));

    GameManager.addObjective(Objective.NoEnemiesRemain);

    const level = { setup: () => { } };
    GameManager.setupLevel(level);

    expect(GameManager.retrieveAllActors().length).toBe(0);
    expect(GameManager.getObjectives().length).toBe(0);
});

test("objectiveComplete returns false for failed objective", () => {
    GameManager.addObjective(Objective.NoEnemiesRemain);
    expect(GameManager.objectivesFailed()).toBe(true);
    expect(GameManager.objectivesComplete()).toBe(false);

});