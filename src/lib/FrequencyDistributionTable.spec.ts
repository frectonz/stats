import {
  makeTableMap,
  FrequencyDistributionTable,
} from "./FrequencyDistributionTable";

const generateTableArray = (numbers: number[]): [number, number][] => {
  return Array.from(makeTableMap(numbers).entries());
};

describe("Generate A Frequency Distribution", () => {
  test("Make Frequency Distribution Table", () => {
    expect(generateTableArray([1, 1, 2, 2])).toStrictEqual([
      [1, 2],
      [2, 2],
    ]);

    expect(
      generateTableArray([1, 1, 2, 2, 2, 3, 4, 4, 5, 5, 5, 5])
    ).toStrictEqual([
      [1, 2],
      [2, 3],
      [3, 1],
      [4, 2],
      [5, 4],
    ]);
  });

  test("Frequency Distribution Table", () => {
    const table = FrequencyDistributionTable.make([1, 2, 2, 3]);

    expect(table.length).toBe(3);
    expect(table[0].observation).toBe(1);
    expect(table[0].frequency).toBe(1);
    expect(table[0].cumulativeFrequency).toBe(1);

    expect(table[1].observation).toBe(2);
    expect(table[1].frequency).toBe(2);
    expect(table[1].cumulativeFrequency).toBe(3);

    expect(table[2].observation).toBe(3);
    expect(table[2].frequency).toBe(1);
    expect(table[2].cumulativeFrequency).toBe(4);
  });
});

export {};
