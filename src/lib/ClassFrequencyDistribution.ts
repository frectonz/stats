import { Class, FrequencyDistribution } from "./entities";

function generateLimits(
  lowerLimit: number,
  numOfClasses: number,
  interval: number
): number[] {
  const lowerLimits = [];

  for (let i = 0; i < numOfClasses; i++) {
    lowerLimits.push(lowerLimit);
    lowerLimit += interval;
  }

  return lowerLimits;
}

function generateLowerAndUpperLimits(
  minValue: number,
  interval: number,
  maxValue: number,
  numOfClasses: number
) {
  const lowerLimitOfTheFirstClass = minValue;
  const upperLimitOfTheFirstClass = lowerLimitOfTheFirstClass + (interval - 1);
  const upperLimitOfTheLastClass = maxValue;

  const lowerLimits = generateLimits(
    lowerLimitOfTheFirstClass,
    numOfClasses,
    interval
  );
  const upperLimits = generateLimits(
    upperLimitOfTheFirstClass,
    numOfClasses,
    interval
  );
  upperLimits[upperLimits.length - 1] = upperLimitOfTheLastClass;
  return { lowerLimits, upperLimits };
}

function initializeVars(
  frequencyDistributions: FrequencyDistribution[],
  numOfClasses: number
) {
  const lastIndex = frequencyDistributions.length - 1;
  const maxValue = frequencyDistributions[lastIndex].observation;
  const minValue = frequencyDistributions[0].observation;

  const interval = Math.round((maxValue - minValue) / numOfClasses);
  return { minValue, interval, maxValue };
}

function generateClasses(
  lowerLimits: number[],
  upperLimits: number[],
  correctionFactor: number
) {
  const classes: Class[] = [];
  for (let i = 0; i < lowerLimits.length; i++) {
    const lowerLimit = lowerLimits[i];
    const upperLimit = upperLimits[i];

    classes.push(
      new Class({
        lowerLimit,
        upperLimit,
        correctionFactor,
      })
    );
  }
  return classes;
}

function checkIfTheValueOfTheCurrentObservationIsPartOfAClass(
  c: Class,
  fD: FrequencyDistribution
) {
  return c.lowerBound < fD.observation && c.upperBound >= fD.observation;
}

export class ClassFrequencyDistributionTable {
  static make(
    frequencyDistributions: FrequencyDistribution[],
    numOfClasses: number
  ): Class[] {
    const { minValue, interval, maxValue } = initializeVars(
      frequencyDistributions,
      numOfClasses
    );

    const { lowerLimits, upperLimits } = generateLowerAndUpperLimits(
      minValue,
      interval,
      maxValue,
      numOfClasses
    );

    const correctionFactor = (lowerLimits[1] - upperLimits[0]) / 2;

    const classes: Class[] = generateClasses(
      lowerLimits,
      upperLimits,
      correctionFactor
    );

    classes.forEach((c) => {
      frequencyDistributions.forEach((fD) => {
        if (checkIfTheValueOfTheCurrentObservationIsPartOfAClass(c, fD)) {
          c.frequency += fD.frequency;
          c.cumulativeFrequency = fD.cumulativeFrequency;
        }
      });
    });

    for (let i = 1; i < classes.length; i++) {
      const c = classes[i];
      if (c.frequency === 0) {
        let classBefore = classes[i - 1];
        c.cumulativeFrequency = classBefore.cumulativeFrequency;
      }
    }

    return classes;
  }

  static makeFromLimits(
    lowerLimits: number[],
    upperLimits: number[],
    frequencies: number[]
  ) {
    const correctionFactor = (lowerLimits[1] - upperLimits[0]) / 2;

    const classes: Class[] = [];
    for (let i = 0; i < lowerLimits.length; i++) {
      const lowerLimit = lowerLimits[i];
      const upperLimit = upperLimits[i];
      const frequency = frequencies[i];

      const c = new Class({
        lowerLimit,
        upperLimit,
        correctionFactor,
      });

      c.frequency = frequency;
      c.cumulativeFrequency = 0;

      classes.push(c);
    }

    let cumulativeFrequency = 0;
    for (let i = 0; i < classes.length; i++) {
      const c = classes[i];
      cumulativeFrequency += c.frequency;
      c.cumulativeFrequency = cumulativeFrequency;
    }

    return classes;
  }
}
