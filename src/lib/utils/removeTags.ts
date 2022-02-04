const removeTags = (text: string) => {
  return text.replace(/(<[^>]+>|\n|\r|\r\n)/g, "");
};

export default removeTags;
