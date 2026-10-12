export const calculateResultsPerPage = (mainWidth) => {
  const ResultPerPage =
    mainWidth > 1101
      ? 12
      : mainWidth > 916
        ? 10
        : mainWidth < 729 && mainWidth >= 543
          ? 6
          : mainWidth < 543
            ? 4
            : 8;

  return ResultPerPage;
};
