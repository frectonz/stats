import {
  Mean,
  Mode,
  Range,
  Median,
  Decile,
  Variance,
  Quartile,
  Percentile,
  StandardDeviation,
  FrequencyDistributionTable,
  ClassFrequencyDistributionTable,
} from "../lib";
import { Class } from "../lib/entities";
import { useEachInputStore } from "../hooks/useEachInputPage";
import { useClassInputStore } from "./useClassInputPage";

export function useOutput() {
  const { inputs, numberOfClasses } = useEachInputStore();

  const data: {
    mean: number;
    mode: number;
    range: number;
    median: number;
    variance: number;
    stdDeviation: number;

    deciles: number[];
    quartiles: number[];
    percentiles: number[];

    classes: Class[];
  } = {
    mean: 0,
    mode: 0,
    range: 0,
    median: 0,
    variance: 0,
    stdDeviation: 0,

    deciles: [],
    quartiles: [],
    percentiles: [],
    classes: [],
  };

  try {
    const fDTable = FrequencyDistributionTable.make(inputs);
    const classes = ClassFrequencyDistributionTable.make(
      fDTable,
      numberOfClasses
    );

    data.mean = new Mean(classes).calculate();
    data.mode = new Mode(classes).calculate();
    data.range = new Range(classes).calculate();
    data.median = new Median(classes).calculate();
    data.deciles = new Decile(classes).calculate();
    data.variance = new Variance(classes).calculate();
    data.quartiles = new Quartile(classes).calculate();
    data.percentiles = new Percentile(classes).calculate();
    data.stdDeviation = new StandardDeviation(classes).calculate();

    data.classes = classes;
  } catch {}

  return { data };
}

export function useClassOutput() {
  const { lowerLimits, upperLimits, frequencies } = useClassInputStore();

  const data: {
    mean: number;
    mode: number;
    range: number;
    median: number;
    variance: number;
    stdDeviation: number;

    deciles: number[];
    quartiles: number[];
    percentiles: number[];

    classes: Class[];
  } = {
    mean: 0,
    mode: 0,
    range: 0,
    median: 0,
    variance: 0,
    stdDeviation: 0,

    deciles: [],
    quartiles: [],
    percentiles: [],
    classes: [],
  };

  const classes = ClassFrequencyDistributionTable.makeFromLimits(
    lowerLimits,
    upperLimits,
    frequencies
  );

  data.mean = new Mean(classes).calculate();
  data.mode = new Mode(classes).calculate();
  data.median = new Median(classes).calculate();
  data.range = new Range(classes).calculate();
  data.variance = new Variance(classes).calculate();
  data.stdDeviation = new StandardDeviation(classes).calculate();
  data.quartiles = new Quartile(classes).calculate();
  data.deciles = new Decile(classes).calculate();
  data.percentiles = new Percentile(classes).calculate();

  data.classes = classes;

  return { data };
}
