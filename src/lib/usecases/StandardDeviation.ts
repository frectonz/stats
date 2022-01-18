import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";
import { Variance } from "./Variance";

export class StandardDeviation implements UseCase {
  private classes: Class[];
  private variance: number;
  constructor(classes: Class[]) {
    this.classes = classes;
    this.variance = new Variance(classes).calculate();
  }

  calculate() {
    return Math.sqrt(this.variance);
  }
}
