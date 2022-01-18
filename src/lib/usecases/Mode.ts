import { Class } from "../entities";
import { UseCase } from "./protocols/UseCase";

export class Mode implements UseCase {
  private classes: Class[];
  constructor(classes: Class[]) {
    this.classes = classes;
  }

  calculate() {
    const [modalClass, modalClassIndex] = this.getModalClass();
    const lowerBoundOfTheMode = modalClass.lowerBound;
    const precedingClass =
      this.classes[modalClassIndex - 1 < 0 ? 0 : modalClassIndex - 1];
    const nextClass = this.classes[modalClassIndex + 1];

    const d1 = modalClass.frequency - precedingClass.frequency;
    const d2 = modalClass.frequency - nextClass.frequency;

    const interval = this.getClassInterval();

    return lowerBoundOfTheMode + (d1 / (d1 + d2)) * interval;
  }

  private getModalClass(): [Class, number] {
    let modalClass = this.classes[0];
    let modalClassIndex = 0;

    for (let i = 1; i < this.classes.length; i++) {
      const c = this.classes[i];
      if (c.frequency > modalClass.frequency) {
        modalClass = c;
        modalClassIndex = i;
      }
    }

    return [modalClass, modalClassIndex];
  }

  private getClassInterval() {
    return this.classes[0].upperBound - this.classes[0].lowerBound;
  }
}
