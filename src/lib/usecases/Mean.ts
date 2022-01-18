import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";

export class Mean implements UseCase {
  private classes: Class[];
  constructor(classes: Class[]) {
    this.classes = classes;
  }

  calculate() {
    const sum = this.calculateSum();
    const numOfEntries = this.calculateSumOfFrequencies();
    return sum / numOfEntries;
  }

  private calculateSum() {
    let sum = 0;
    this.classes.forEach((c) => {
      sum += c.classMidpoint * c.frequency;
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
