const getReadingTime = (stringToCheck) => {
  const wordCount = stringToCheck
    .trim()
    .replace(/[^\w ]/g, "")
    .split(/\s+/).length;
  const secondsToRead = wordCount / (10 / 3);
  const minsToRead = Math.ceil(secondsToRead / 60);
  return minsToRead;
};

export default getReadingTime;
