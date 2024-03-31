import fromExponential from "from-exponential";

export const newDisplayFloats = (num = 0, maxDigits = 2, showMax = false) => {
  if (Number.isInteger(num) || !num || !Number.isFinite(num)) return num;
  const strValue = fromExponential(num); // handle very small numbers (could inclue "e" in string value)
  const [beforeDecimalPart, afterDecimalPart] = strValue.split(".");
  maxDigits =
    maxDigits > afterDecimalPart.length ? afterDecimalPart.length : maxDigits;
  const maxPossibleDigitsLength = showMax ? afterDecimalPart.length : maxDigits;
  const substrValue = afterDecimalPart.substring(0, maxPossibleDigitsLength);
  const numValue = [beforeDecimalPart, substrValue].join(".");
  return +numValue;
};
