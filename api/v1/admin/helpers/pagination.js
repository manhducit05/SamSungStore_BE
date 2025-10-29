module.exports = (objectPagination, query, countProduct) => {
  if (query.page) {
    if (parseInt(query.page)) {
      objectPagination.currentPage = parseInt(query.page)
    } else {
      objectPagination.currentPage = 1
    }
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem

  const totalPage = Math.ceil(countProduct / objectPagination.limitItem)
  objectPagination.totalPage = totalPage

  return objectPagination;
}