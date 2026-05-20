/**
 *
 * @param riotId 문자열 (ex. Hide on bush#KR1, Hide on bush-KR1 형식 )
 * @param sign '#', '-'
 * @returns name과 tag의 객체를 반환
 */
export function handleRiotId(riotId: string, sign: string) {
  const parts = riotId.split(sign);
  const name = parts[0];
  const tag = parts[1];

  if (tag === undefined) {
    return {
      name,
      tag: "KR1",
    };
  } else {
    return {
      name,
      tag,
    };
  }
}

export function extractSummonerName(pathname: string) {
  const decoded = decodeURI(pathname);
  const summonerName = decoded.substring(decoded.indexOf("kr/") + 3);
  return summonerName;
}
