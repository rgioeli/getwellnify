export const flattenNestedArray = (arr: any[]) => {
  const terms = arr[3].map((x: []) => x);
  const flattenArray = terms.flat();
  return flattenArray;
};
