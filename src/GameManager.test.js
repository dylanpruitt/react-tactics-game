import GameManager from "./GameManager";

const TEST_ACTORS = [
    {name: "Ray",   hp: 10, x: 1, y: 1},
    {name: "Dylan", hp:  9, x: 3, y: 1},
    {name: "Clara", hp: 11, x: 1, y: 2},
    {name: "Jon",   hp: 13, x: 4, y: 1},
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
        {name: "Ray",   hp: 10, x: 1, y: 1},
        {name: "Dylan", hp:  9, x: 3, y: 1},
    ];
    GameManager.removeActors((actor) => actor.hp > 10);
    let result = GameManager.retrieveActors((actor) => true);
    expect(result).toEqual(expected);

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
        {name: "Clara", hp: 11, x: 1, y: 2},
        {name: "Jon",   hp: 13, x: 4, y: 1},
    ];

    expect(GameManager.retrieveActors((a) => a.hp > 10)).toEqual(expect.arrayContaining(expected));

    GameManager.removeActors((actor) => true);
});

test("addActors throws error for null newActors object", () => {
    expect(() => GameManager.addActors(null)).toThrow(Error("newActors cannot be null or undefined"));
});

test("addActor throws error for null actor", () => {
    expect(() => GameManager.addActor(null).toThrow(Error("actor cannot be null or undefined")));
});

test("addActor throws error for duplicate position", () => {
    const TEST_ACTOR = {x:1,y:1};
    GameManager.addActor(TEST_ACTOR);
    expect(() => GameManager.addActor(TEST_ACTOR)).toThrow(Error("another actor is already at this x, y"));

    GameManager.removeActors((actor) => true);
});

test("addActors adds new actor", () => {
    const TEST_ACTOR = {name:"Raymond",x:1,y:1};
    GameManager.addActor(TEST_ACTOR);

    const ACTORS = GameManager.retrieveActors((actor) => true);
    expect(ACTORS.length).toBe(1);
    expect(ACTORS[0]).toEqual(TEST_ACTOR);

    GameManager.removeActors((actor) => true);
});
