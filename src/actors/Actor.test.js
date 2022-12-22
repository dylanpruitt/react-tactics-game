import GameManager from "../GameManager";
import Actor from "./Actor";
import ActorType from "./ActorType";
import Attack from "../skills/Attack";
import Faction from "./Faction";
import Move from "../skills/Move";
import SkillType from "../skills/SkillType";
import Status from "../statuses/Status";

test("actor throws error for invalid x, y", () => {
    // x, y < 0
    expect(() => Actor("test", -1, 0)).toThrow(Error("invalid actor x: -1"));
    expect(() => Actor("test", 0, -1)).toThrow(Error("invalid actor y: -1"));
    expect(() => Actor("test", GameManager.BOARD_SIZE, 0)).toThrow(Error(`invalid actor x: ${GameManager.BOARD_SIZE}`));
    expect(() => Actor("test", 0, GameManager.BOARD_SIZE)).toThrow(Error(`invalid actor y: ${GameManager.BOARD_SIZE}`));
});

test("set position updates actor x, y", () => {
    let actor = Actor("Test", 0, 0);
    actor.setPosition(2, 3);
    expect(actor.getX()).toBe(2);
    expect(actor.getY()).toBe(3);
});

test("set position will not move actors to invalid x, y", () => {
    let actor = Actor("Test", 0, 0);

    actor.setPosition(-1, -1);
    expect(actor.getX()).toBe(0);
    expect(actor.getY()).toBe(0);

    actor.setPosition(GameManager.BOARD_SIZE, GameManager.BOARD_SIZE);
    expect(actor.getX()).toBe(0);
    expect(actor.getY()).toBe(0);
});

test("setMaxHP works", () => {
    let actor = Actor("Test", 0, 0);
    actor.setMaxHP(5);
    expect(actor.getMaxHP()).toBe(5);
});

test("setType throws error for undefined type", () => {
    let actor = Actor("Test", 0, 0);
    expect(() => actor.setType(ActorType.UNDEFINED)).toThrow(Error("Invalid ActorType for actor!"));
    expect(actor.getType()).toBe(ActorType.MELEE);
});

test("setType throws error for undefined type", () => {
    let actor = Actor("Test", 0, 0);
    expect(() => actor.setType(ActorType.UNDEFINED)).toThrow(Error("Invalid ActorType for actor!"));
    expect(actor.getType()).toBe(ActorType.MELEE);
});

test("setType updates actor type", () => {
    let actor = Actor("Test", 0, 0);
    actor.setType(ActorType.RANGED);
    expect(actor.getType()).toBe(ActorType.RANGED);
});

test("add skill", () => {
    let actor = Actor("Test", 0, 0);
    actor.addSkill(Attack);

    expect(actor.getSkills()).toEqual([Move, Attack]);
});

test("set player controlled", () => {
    let actor = Actor("Test", 0, 0);
    actor.setPlayerControlled(true);
    expect(actor.playerControlled()).toBe(true);
});

test("set/reset maxAP", () => {
    let actor = Actor("Test", 0, 0);
    actor.setMaxAP(50);
    actor.resetAP();

    expect(actor.getAP()).toBe(50);
    expect(actor.getMaxAP()).toBe(50);
});

test("set attack/defense", () => {
    let actor = Actor("Test", 0, 0);
    actor.setAttack(5);
    actor.setDefense(5);

    expect(actor.getAttack()).toBe(5);
    expect(actor.getDefense()).toBe(5);
});

test("getSkillType returns correct skill", () => {
    let actor = Actor("Test", 0, 0);
    actor.addSkill(Attack);
    expect(actor.getSkillType(SkillType.ATTACK)).toBe(Attack);
});

test("getSkillType returns null if skill not found", () => {
    let actor = Actor("Test", 0, 0);
    expect(actor.getSkillType(SkillType.HEAL)).toBe(null);
});

test("setFaction throws error for undefined faction", () => {
    let actor = Actor("Test", 0, 0);
    expect(() => actor.setFaction(Faction.UNDEFINED)).toThrow(Error("Invalid Faction for actor!"));
    expect(actor.getFaction()).toBe(Faction.NEUTRAL);
});

test("addStatus adds new status", () => {
    let actor = Actor("Test", 0, 0);
    actor.addStatus(Status());
    expect(() => actor.getStatuses().length === 1);
    expect(actor.getStatuses()[0].getName()).toBe("Status");
});

test("addStatus will not add null status", () => {
    let actor = Actor("Test", 0, 0);
    actor.addStatus(null);
    expect(() => actor.getStatuses().length === 0);
});

test("addStatus will not add duplicate status", () => {
    let actor = Actor("Test", 0, 0);
    actor.addStatus(Status());
    actor.addStatus(Status());
    expect(() => actor.getStatuses().length === 1);
});

test("updateStatuses removes statuses after turnCount < 1", () => {
    let actor = Actor("Test", 0, 0);
    actor.addStatus(Status());
    expect(() => actor.getStatuses().length === 1);

    actor.updateStatuses();
    actor.updateStatuses();
    expect(() => actor.getStatuses().length === 0);
});