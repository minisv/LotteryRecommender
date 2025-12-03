export interface LottoRecommendation {
  id: string;
  drawNumber: number;
  numbers: number[];
  createdAt: string;
}

export interface WeeklyUsage {
  weekStart: string;
  count: number;
}

export interface LottoResult {
  returnValue: string;
  drwNo: number;
  drwNoDate: string;
  totSellamnt: number;
  firstWinamnt: number;
  firstPrzwnerCo: number;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}