export const getValueByMultiProps = (
  value: any,
  possibleKeys: string[] = []
) => {
  // not all tokens has valid imgs
  if (!value) return undefined;
  const validKey = possibleKeys.find((key) => value?.[key]);
  if (!validKey) return;
  return value?.[validKey];
};
