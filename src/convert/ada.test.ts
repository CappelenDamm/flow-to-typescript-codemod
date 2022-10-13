import { transform } from "./utils/testing";
import dedent from "dedent";

describe("transform patterns", () => {
  it("Adds HTMLElement type parameter to querySelector function", async () => {
    const src = dedent`
    // @flow
    const test = document.querySelector(".foo");
    `;
    const expected = dedent`
    const test = document.querySelector<HTMLElement>(".foo");
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Adds HTMLElement type parameter to querySelectorAll function", async () => {
    const src = dedent`
    // @flow
    const test = document.querySelectorAll(".foo");
    `;
    const expected = dedent`
    const test = document.querySelectorAll<HTMLElement>(".foo");
    `;
    expect(await transform(src)).toBe(expected);
  });

  it("Removes type parameters in react-redux's connect() function", async () => {
    const src = dedent`
    // @flow
    const test = connect<Props, OwnProps, _, _, _, _>(null);
    `;
    const expected = dedent`
    const test = connect(null);
    `;
    expect(await transform(src)).toBe(expected);
  });
});
