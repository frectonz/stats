import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";

export class Percentile implements UseCase {
  private classes: Class[];
  constructor(classes: Class[]) {
    this.classes = classes;
  }

  calculate() {
    const percentiles = [];

    for (let i = 1; i < 100; i++) {
      const [percentileClass, percentileClassIndex] =
        this.getThePercentileClass(i) as [Class, number];

      const percentileItem = this.getThePercentileItem(i);
      const cumulativeFrequencyBeforeThePercentileClass =
        percentileClassIndex - 1 < 0
          ? 0
          : this.classes[percentileClassIndex - 1].cumulativeFrequency;
      const interval = this.getClassInterval();
      const lowerBoundaryOfThePercentileClass = percentileClass.lowerBound;

      const kthPercentile =
        lowerBoundaryOfThePercentileClass +
        ((percentileItem - cumulativeFrequencyBeforeThePercentileClass) /
          percentileClass.frequency) *
          interval;

      percentiles.push(kthPercentile);
    }

    return percentiles;
  }

  private getThePercentileItem(k: number) {
    const n = this.getNumberOfObservations();
    return Math.round((k * n) / 100);
  }

  private getNumberOfObservations() {
    return this.classes[this.classes.length - 1].cumulativeFrequency;
  }

  private getThePercentileClass(k: number) {
    const percentileItem = this.getThePercentileItem(k);

    for (let i = 0; i < this.classes.length; i++) {
      const c = this.classes[i];
      if (c.cumulativeFrequency >= percentileItem) {
        return [this.classes[i], i];
      }
    }
  }

  private getClassInterval() {
    return this.classes[0].upperBound - this.classes[0].lowerBound;
  }
}
