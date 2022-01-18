import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";

export class Range implements UseCase {
  private classes: Class[];
  constructor(classes: Class[]) {
    this.classes = classes;
  }

  calculate() {
    const upperBoundOfTheHighestClass =
      this.classes[this.classes.length - 1].upperBound;
    const lowerBoundOfTheLowestClass = this.classes[0].lowerBound;
    return upperBoundOfTheHighestClass - lowerBoundOfTheLowestClass;
  }
}
