const getFormatLessTen = (time) => {
  return time < 10 ? `0${time}` : `${time}`;
};


export const getTimeElapsed = (duration, currentTime) => {
  const timeDiff = duration - currentTime;
  const seconds = getFormatLessTen((timeDiff) % 60);
  const minutes = getFormatLessTen(Math.trunc(timeDiff / 60));
  const hours = getFormatLessTen(Math.trunc(minutes / 60));
  return `${hours}:${minutes}:${seconds}`;
};

export const getPosition = (currentTime, duration) => {
  if (duration === 0) {
    return 0;
  }
  return Math.trunc(currentTime / duration * 100);
};
