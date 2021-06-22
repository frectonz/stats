import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";

export class Decile implements UseCase {
  private classes: Class[];
  constructor(classes: Class[]) {
    this.classes = classes;
  }

  calculate() {
    const deciles = [];

    for (let i = 1; i < 10; i++) {
      const [decileClass, decileClassIndex] = this.getTheDecileClass(i) as [
        Class,
        number
      ];

      const decileItem = this.getTheDecileItem(i);
      const cumulativeFrequencyBeforeTheDecileClass =
        decileClassIndex - 1 < 0
          ? 0
          : this.classes[decileClassIndex - 1].cumulativeFrequency;
      const interval = this.getClassInterval();
      const lowerBoundaryOfTheDecileClass = decileClass.lowerBound;

      const kthDecile =
        lowerBoundaryOfTheDecileClass +
        ((decileItem - cumulativeFrequencyBeforeTheDecileClass) /
          decileClass.frequency) *
          interval;

      deciles.push(kthDecile);
    }

    return deciles;
  }

  private getTheDecileItem(k: number) {
    const n = this.getNumberOfObservations();
    return Math.round((k * n) / 10);
  }

  private getNumberOfObservations() {
    return this.classes[this.classes.length - 1].cumulativeFrequency;
  }

  private getTheDecileClass(k: number) {
    const decileItem = this.getTheDecileItem(k);

    for (let i = 0; i < this.classes.length; i++) {
      const c = this.classes[i];
      if (c.cumulativeFrequency >= decileItem) {
        return [this.classes[i], i];
      }
    }
  }

  private getClassInterval() {
    return this.classes[0].upperBound - this.classes[0].lowerBound;
  }
}
