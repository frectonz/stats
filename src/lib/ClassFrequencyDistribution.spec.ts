import { FrequencyDistributionTable } from "./FrequencyDistributionTable";
import { ClassFrequencyDistributionTable } from "./ClassFrequencyDistribution";
import {
  Mean,
  Mode,
  Median,
  Quartile,
  Decile,
  Percentile,
  Range,
  Variance,
  StandardDeviation,
} from "./usecases";
import { Class } from "./entities";

describe("Statistics", () => {
  let classes: Class[];
  beforeAll(() => {
    classes = ClassFrequencyDistributionTable.make(
      FrequencyDistributionTable.make([
        42, 48, 16, 39, 33, 28, 26, 29, 30, 18, 56, 16, 22, 36, 62, 52, 24, 38,
        24, 16, 14, 12, 32, 19, 24, 21, 30, 32, 78, 54,
      ]),
      11
    );
  });

  test("Class Frequency Distribution", () => {
    expect(classes[0].frequency).toBe(5);
    expect(classes[0].lowerLimit).toBe(12);
    expect(classes[0].upperLimit).toBe(17);
    expect(classes[0].correctionFactor).toBe(0.5);
    expect(classes[0].cumulativeFrequency).toBe(5);
  });

  test("Mean", () => {
    const mean = new Mean(classes);

    expect(mean.calculate()).toBe(32.916666666666664);
  });

  test("Median", () => {
    const median = new Median(classes);

    expect(median.calculate()).toBe(29.5);
  });

  test("Mode", () => {
    const mode = new Mode(classes);

    expect(mode.calculate()).toBe(27.5);
  });

  test("Quartile", () => {
    const quartile = new Quartile(classes);

    expect(quartile.calculate()).toStrictEqual([22, 29.5, 41.5]);
  });

  test("Decile", () => {
    const decile = new Decile(classes);

    expect(decile.calculate()).toStrictEqual([
      15.1, 19, 23.5, 26.5, 29.5, 33.1, 37.5, 47.5, 56.5,
    ]);
  });

  test("Percentile", () => {
    const percentile = new Percentile(classes);

    expect(percentile.calculate()).toStrictEqual([
      11.5, 12.7, 12.7, 12.7, 13.9, 13.9, 13.9, 13.9, 15.1, 15.1, 15.1, 16.3,
      16.3, 16.3, 17.5, 17.5, 17.5, 17.5, 19, 19, 19, 20.5, 20.5, 20.5, 22, 22,
      22, 22, 23.5, 23.5, 23.5, 24.5, 24.5, 24.5, 25.5, 25.5, 25.5, 25.5, 26.5,
      26.5, 26.5, 27.5, 27.5, 27.5, 28.5, 28.5, 28.5, 28.5, 29.5, 29.5, 29.5,
      30.7, 30.7, 30.7, 31.9, 31.9, 31.9, 31.9, 33.1, 33.1, 33.1, 34.3, 34.3,
      34.3, 35.5, 35.5, 35.5, 35.5, 37.5, 37.5, 37.5, 39.5, 39.5, 39.5, 41.5,
      41.5, 41.5, 41.5, 47.5, 47.5, 47.5, 50.5, 50.5, 50.5, 53.5, 53.5, 53.5,
      53.5, 56.5, 56.5, 56.5, 59.5, 59.5, 59.5, 65.5, 65.5, 65.5, 65.5, 77.5,
    ]);
  });

  test("Range", () => {
    const range = new Range(classes);

    expect(range.calculate()).toBe(67);
  });

  test("Variance", () => {
    const variance = new Variance(classes);

    expect(variance.calculate()).toBe(238.83472222222224);
  });

  test("Standard Deviation", () => {
    const stdDeviation = new StandardDeviation(classes);

    expect(stdDeviation.calculate()).toBe(15.454278443920384);
  });
});

export {};
