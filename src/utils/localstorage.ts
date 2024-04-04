export const storeInLs = (key: string, value: any) =>
  localStorage.setItem(key, value);

export const retrieveFromLs = (key: string) => localStorage.getItem(key) || "";

export const retrieveObjFromLs = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "");
