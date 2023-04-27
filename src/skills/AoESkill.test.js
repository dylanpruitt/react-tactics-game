import GameManager from "../GameManager";
import AoESkill from "./AoESkill";
import Actor from "../actors/Actor";

const TEST_ACTORS = [
    Actor("Ray", 2, 2),
    Actor("Dylan", 1, 1),
    Actor("Clara", 3, 1),
    Actor("Jon", 3, 3),
    Actor("Jack", 4, 3),
];

GameManager.addActors(TEST_ACTORS);

test("AoE hits everyone in range", () => {
    const logSpy = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const raymond = GameManager.getActorAt(2, 2);
    AoESkill.use(raymond, { x: 2, y: 2 });

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenCalledWith(`Ray was tagged!`);

    const expected = [["Ray was tagged!"], ["Dylan was tagged!"], ["Clara was tagged!"], ["Jon was tagged!"]];
    expect(logSpy.mock.calls).toEqual(expected);
    expect(logSpy.mock.calls).not.toContainEqual([
        "Jack was tagged!"
    ]);
    logSpy.mockRestore();
});

test("AoE does not fire on target out of range", () => {
    const logSpy = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const raymond = GameManager.getActorAt(2, 2);
    AoESkill.use(raymond, { x: 5, y: 2 });

    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
});