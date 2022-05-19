function pager(pageNo, pageSize) {
  const limit = Math.max(+pageSize, 1)
  const offset = Math.max(0, +pageNo - 1) * +pageSize

  return {
    limit,
    offset
  }
}

module.exports = { 
  pager
}