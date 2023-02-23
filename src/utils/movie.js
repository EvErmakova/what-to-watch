import {TextRates} from "../const";

export const getRateText = (value) => {
  if (value <= 3) {
    return TextRates.BAD;
  }
  if (value <= 5) {
    return TextRates.NORMAL;
  }
  if (value <= 8) {
    return TextRates.GOOD;
  }
  if (value < 10) {
    return TextRates.VERY_GOOD;
  }
  return TextRates.AWESOME;
};
