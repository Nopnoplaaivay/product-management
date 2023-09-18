module.exports = (objectPagination, query, countProducts) => {

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page)
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;


  console.log(countProducts);
  objectPagination.totalPage = Math.ceil(countProducts / objectPagination.limitItems);

  return objectPagination;
}