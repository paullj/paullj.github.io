export const parseFrontmatter = (markdown) => {
  const metadata = {};
  let body = markdown;
  const match = /---([\s\S]+?)---/.exec(markdown);
  if (match) {
    const frontMatter = match[1];
    body = markdown.slice(match[0].length);

    frontMatter.split("\n").forEach((pair) => {
      const colonIndex = pair.indexOf(":");
      metadata[pair.slice(0, colonIndex).trim()] = pair
        .slice(colonIndex + 1)
        .trim();
    });
  }

  return { metadata, body };
};
