/**
 * 배열을 특정 키값으로 매핑
 */
export function groupByToMap<T, K>(items: T[], getKey: (item: T) => K): Map<K, T[]> {
  const grouped = new Map<K, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = grouped.get(key);

    if (group) {
      group.push(item);
    } else {
      grouped.set(key, [item]);
    }
  }

  return grouped;
}
