import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";
import { Mean } from "./Mean";

export class Variance implements UseCase {
  private classes: Class[];
  private mean: number;
  constructor(classes: Class[]) {
    this.classes = classes;
    this.mean = new Mean(classes).calculate();
  }

  calculate() {
    return (
      this.deviationOfEachClassMarkFromTheMeanSquared() /
      this.calculateSumOfFrequencies()
    );
  }

  private deviationOfEachClassMarkFromTheMeanSquared() {
    let sum = 0;
    this.classes.forEach((c) => {
      sum += Math.pow(c.classMidpoint - this.mean, 2) * c.frequency;
    });
    return sum;
  }

  private calculateSumOfFrequencies() {
    let sum = 0;
    this.classes.forEach((c) => {
      sum += c.frequency;
    });
    return sum;
  }
}
