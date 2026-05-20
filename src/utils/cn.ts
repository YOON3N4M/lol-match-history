/**
 * 클래스 컴바이너
 */
export const cn = (...classNames: (string | false | undefined)[]) => {
  const styledClassNames = [...classNames]
    .map((className) => className && className.split(" "))
    .flat()
    .filter((className) => className);

  return styledClassNames.join(" ");
};
