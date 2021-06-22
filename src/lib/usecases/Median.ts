import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";

export class Median implements UseCase {
  private classes: Class[];
  constructor(classes: Class[]) {
    this.classes = classes;
  }

  calculate() {
    const [medianClass, medianClassIndex] = this.getTheMedianClass() as [
      Class,
      number
    ];
    const medianItem = this.getMedianItem();
    const cumulativeFrequencyBeforeTheMedianClass =
      this.classes[medianClassIndex - 1].cumulativeFrequency;
    const interval = this.getClassInterval();

    const lowerBoundaryOfTheMedianClass = medianClass.lowerBound;

    return (
      lowerBoundaryOfTheMedianClass +
      ((medianItem - cumulativeFrequencyBeforeTheMedianClass) /
        medianClass.frequency) *
        interval
    );
  }

  private getMedianItem() {
    return Math.round(this.getNumberOfObservations() / 2);
  }

  private getTheMedianClass() {
    const medianItem = this.getMedianItem();

    for (let i = 0; i < this.classes.length; i++) {
      const c = this.classes[i];
      if (c.cumulativeFrequency >= medianItem) {
        return [this.classes[i], i];
      }
    }
  }

  private getNumberOfObservations() {
    return this.classes[this.classes.length - 1].cumulativeFrequency;
  }

  private getClassInterval() {
    return this.classes[0].upperBound - this.classes[0].lowerBound;
  }
}
