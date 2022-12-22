import Actor from "../actors/Actor";
import GameManager from "../GameManager";
import WarcrySkill from "./WarcrySkill";

const USER = Actor("test", 0, 0);

test("adds warcry status", () => {
    let test = Actor("test", 1, 0); GameManager.addActor(test);
    WarcrySkill.use(USER, {x: 1, y: 0});

    expect(test.getStatuses().length).toBe(1);

    GameManager.removeActors((a) => true);
});