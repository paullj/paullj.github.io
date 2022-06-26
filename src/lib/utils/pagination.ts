export default <T>(items: T[], pageSize: number, currentPage: number) => {
  return items.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize
  );
};
