export const createPagesList = ({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}) => {
  const pages = Array(totalPages > 4 ? 4 : totalPages)
    .fill(null)
    .map((_, index, self) => {
      if (page + 3 >= totalPages) return totalPages - (self.length - index);
      if (index < self.length - 1) return index + page;
    });

  totalPages > 1 ? pages.push(totalPages) : (pages[0] = totalPages);
  return pages;
};
