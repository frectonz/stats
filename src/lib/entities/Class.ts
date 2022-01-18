export class Class {
  public readonly lowerLimit: number;
  public readonly upperLimit: number;
  public readonly correctionFactor: number;
  public frequency: number;
  public cumulativeFrequency: number;

  constructor(config: ClassConfig) {
    this.lowerLimit = config.lowerLimit;
    this.upperLimit = config.upperLimit;
    this.correctionFactor = config.correctionFactor;
    this.frequency = 0;
    this.cumulativeFrequency = 0;
  }

  get classMidpoint() {
    return (this.lowerLimit + this.upperLimit) / 2;
  }

  get upperBound() {
    return this.upperLimit + this.correctionFactor;
  }

  get lowerBound() {
    return this.lowerLimit - this.correctionFactor;
  }

  toString() {
    return `${this.lowerLimit} - ${this.upperLimit} | ${this.lowerBound} < x <= ${this.upperBound} | ${this.classMidpoint} | ${this.frequency} | ${this.cumulativeFrequency} | ${this.correctionFactor}`;
  }
}

interface ClassConfig {
  lowerLimit: number;
  upperLimit: number;
  correctionFactor: number;
}
