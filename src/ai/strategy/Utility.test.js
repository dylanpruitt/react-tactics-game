import GameManager from "../../GameManager";
import Brute from "../../actors/Brute";
import Utility from "./Utility";

test("findNearestTarget finds nearest valid target", () => {
    const actor = Brute(1, 1);
    GameManager.addActor(actor);
    GameManager.addPlayerActor(Brute(4, 1));
    GameManager.addActor(Brute(3, 1));

    const target = Utility.findNearestTarget(actor, (a, b) => a.getFaction() !== b.getFaction());
    expect(target.getX()).toBe(4);
    expect(target.getY()).toBe(1);

    GameManager.removeActors((a) => true);
});

test("findClosestTile finds closest possible tile to target", () => {
    const actor = Brute(1, 1);
    const target = Utility.findClosestTile(actor, { getX: () => 5, getY: () => 1 });

    expect(target.x).toBe(3);
    expect(target.y).toBe(1);
});

test("findClosestTile throws errors for null arguments", () => {
    const actor = Brute(1, 1);

    expect(() => Utility.findClosestTile(null, actor)).toThrow(Error("actor cannot be null"));
    expect(() => Utility.findClosestTile(actor, null)).toThrow(Error("target cannot be null"));
});