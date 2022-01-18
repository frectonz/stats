export class FrequencyDistribution {
  constructor(
    public readonly observation: number,
    public readonly frequency: number,
    public readonly cumulativeFrequency: number
  ) {}
}
