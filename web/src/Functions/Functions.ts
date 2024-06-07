/* this function create a array of number to use for pagination, ex: [1,2,3,4,5,6, etc....] */
const paginationArray = (a: number[]) => {
  const number = Number(a);
  const arrayPagination = [...Array(number).keys()].slice(1);
  arrayPagination.push(arrayPagination.length + 1);
  return arrayPagination;
};

export { paginationArray };
