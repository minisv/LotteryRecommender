export interface LotterySet {
  id: string;
  numbers: number[];
  generatedAt: Date;
}

export interface LotterySettings {
  count: number;
  minNumber: number;
  maxNumber: number;
}
