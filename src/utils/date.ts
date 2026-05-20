/**
 * 현재 시간을 기준으로 입력받은 유닉스 타임이 몇시간 전인지 계산
 */
export function calculatedTimeDiffer(unixTime: number) {
  const start = new Date(unixTime);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return "방금 전";

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;

  const months = weeks / 4;
  return `${Math.floor(months)}달 전`;
}
