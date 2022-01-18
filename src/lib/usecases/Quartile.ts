import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";

export class Quartile implements UseCase {
  private classes: Class[];
  constructor(classes: Class[]) {
    this.classes = classes;
  }

  calculate() {
    let quartiles = [];

    for (let i = 1; i < 4; i++) {
      const [quartileClass, quartileClassIndex] = this.getTheQuartileClass(
        i
      ) as [Class, number];

      const quartileItem = this.getTheQuartileItem(i);
      const cumulativeFrequencyBeforeTheQuartileClass =
        quartileClassIndex - 1 < 0
          ? 0
          : this.classes[quartileClassIndex - 1].cumulativeFrequency;
      const interval = this.getClassInterval();
      const lowerBoundaryOfTheQuartileClass = quartileClass.lowerBound;

      const kthQuartile =
        lowerBoundaryOfTheQuartileClass +
        ((quartileItem - cumulativeFrequencyBeforeTheQuartileClass) /
          quartileClass.frequency) *
          interval;
      quartiles.push(kthQuartile);
    }

    return quartiles;
  }

  private getTheQuartileItem(k: number) {
    const n = this.getNumberOfObservations();
    return Math.round((k * n) / 4);
  }

  private getNumberOfObservations() {
    return this.classes[this.classes.length - 1].cumulativeFrequency;
  }

  private getTheQuartileClass(k: number) {
    const quartileItem = this.getTheQuartileItem(k);

    for (let i = 0; i < this.classes.length; i++) {
      const c = this.classes[i];
      if (c.cumulativeFrequency >= quartileItem) {
        return [this.classes[i], i];
      }
    }
  }

  private getClassInterval() {
    return this.classes[0].upperBound - this.classes[0].lowerBound;
  }
}
