import { expect, describe, test } from "@jest/globals";
import { dataActor } from "../../src/services/index";

// type NewObject = {
//     id: number,
//     name: string,
//     owner: string
// }

describe("services/index.ts", () => {
  test("should return Data Actor", async () => {
    const id = "47097";

    const actor = await dataActor(id);

    expect(typeof actor).toBe("object");
  });

  test("should return actor Name", async () => {
    const id = "47097";
    const actor = await dataActor(id);
    expect(actor.name).toBe("Kana Ichinose");
  });

  //   test("error if id doesnt exist", async () => {
  //     const id = "10000000";

  //     try {
  //       await dataActor(id);
  //       expect(true).toBeFalsy();
  //     } catch (error) {
  //       expect(error).toBe(`papusadasd`);
  //     }
  //   });
});
