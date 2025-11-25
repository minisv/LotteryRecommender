import { type WinningData } from '../types/lottery';

export async function fetchWinningNumbers(drawNo: number): Promise<WinningData> {
  const response = await fetch(
    `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`
  );

  if (!response.ok) {
    throw new Error('조회 실패');
  }

  const data = await response.json();

  if (data.returnValue !== 'success') {
    throw new Error('해당 회차 정보를 찾을 수 없습니다.');
  }

  return data;
}