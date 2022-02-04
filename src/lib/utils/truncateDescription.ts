const truncateDescription = (text: string) => {
  return text.length < 150 ? text : text.slice(0, 150) + "...";
};

export default truncateDescription;
