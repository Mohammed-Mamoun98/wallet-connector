export const storeInLs = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const retrieveFromLs = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "");
