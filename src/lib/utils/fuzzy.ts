// https://stackoverflow.com/questions/9206013/javascript-fuzzy-search

export default (searchPattern: string, hay: string) => {
  hay = hay.toLowerCase();
  let i = 0;
  let n = -1;
  let l: string;
  while ((l = searchPattern.toLowerCase()[i++])) {
    if (!~(n = hay.indexOf(l, n + 1))) {
      return false;
    }
  }
  return true;
};
