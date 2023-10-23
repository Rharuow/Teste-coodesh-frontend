export const createPagesList = ({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}) => {
  const pages = Array(4)
    .fill(null)
    .map((_, index, self) => {
      if (page + 3 >= totalPages) return totalPages - (self.length - index);
      if (index < self.length - 1) return index + page;
    });

  pages.push(totalPages);
  return pages;
};
