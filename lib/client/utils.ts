export const ensureArray = <T>(value: T[] | null | undefined): T[] => {
  return Array.isArray(value) ? value : [];
};

export const hasItems = <T>(arr: T[] | null | undefined): boolean => {
  const safeArr = ensureArray(arr);
  return safeArr.length > 0;
};
