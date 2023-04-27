import GameManager from "../GameManager";
import AIController from "./AIController";
import Actor from "../actors/Actor";
import Faction from "../actors/Faction";

test("AIController throws error for invalid faction", () => {
    expect(() => AIController(Faction.UNDEFINED)).toThrow(Error("invalid faction"));
});

test("getFactionActors returns correct values", () => {
    GameManager.addActor(Actor("Test",2,2));
    let test2 = Actor("Test2",4,2); test2.setFaction(Faction.ENEMY);
    GameManager.addActor(test2);
    let test3 = Actor("Test3",5,4); test3.setFaction(Faction.ENEMY);
    GameManager.addActor(test3);

    const controller = AIController(Faction.ENEMY);
    expect(controller.getFactionActors()).toEqual([test2, test3]);

    GameManager.removeActors((a) => true);
});