export const limit = 5;

export const getTotalPageCount = (rowCount) => Math.ceil(rowCount / limit);
