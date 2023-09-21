import { getRandomItems } from "../../../src/utils/math/getRandomItems";

describe("getRandomItems", () => {
  it("should return an array with the specified number of items", () => {
    const items = ["apple", "banana", "cherry", "date", "fig", "grape"];
    const result = getRandomItems(items, 3);
    expect(result.length).toBe(3);
  });

  it("should return unique items", () => {
    const items = ["apple", "banana", "cherry", "date", "fig", "grape"];
    const result = getRandomItems(items, 3);
    const uniqueResult = new Set(result);
    expect(uniqueResult.size).toBe(result.length);
  });

  it("should not mutate the original array", () => {
    const items = ["apple", "banana", "cherry", "date", "fig", "grape"];
    const originalCopy = [...items];
    getRandomItems(items, 3);
    expect(items).toEqual(originalCopy);
  });

  it("should handle requests for more items than available", () => {
    const items = ["apple", "banana", "cherry"];
    const result = getRandomItems(items, 5);
    expect(result.length).toBe(3);
  });
});
