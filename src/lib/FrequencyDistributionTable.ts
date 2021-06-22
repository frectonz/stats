import { sort } from "./helpers/sort";
import { FrequencyDistribution } from "./entities/FrequencyDistribution";

export const makeTableMap = (numbers: number[]): Map<number, number> => {
  const table: Map<number, number> = new Map();

  numbers.forEach((num) => {
    let frequency = table.get(num) ? (table.get(num) as number) : 0;
    table.set(num, frequency + 1);
  });

  return table;
};

export class FrequencyDistributionTable {
  static make(numbers: number[]): FrequencyDistribution[] {
    const frequencyDistributionTable: FrequencyDistribution[] = [];
    const tableMap = makeTableMap(sort(numbers));
    let commutativeFrequency = 0;

    tableMap.forEach((value, key) => {
      const frequency = value;
      const observation = key;

      commutativeFrequency += frequency;

      frequencyDistributionTable.push(
        new FrequencyDistribution(observation, frequency, commutativeFrequency)
      );
    });

    return frequencyDistributionTable;
  }
}
