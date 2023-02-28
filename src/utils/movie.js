import {TextRates} from "../const";
import moment from "moment";

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

export const getFormattedRuntime = (runtime) => {
  const getHours = () => {
    const hours = Math.trunc(runtime / 60);
    return hours > 0 ? `${hours}h` : ``;
  };

  const getMinutes = () => {
    const minutes = runtime % 60;
    return minutes > 0 ? `${minutes}m` : ``;
  };

  return `${getHours()} ${getMinutes()}`;
};

export const getFormattedDate = (date) => {
  if (date) {
    return moment(date).format(`MMMM D, YYYY`);
  }
  return null;
};
