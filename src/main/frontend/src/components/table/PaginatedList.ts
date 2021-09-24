export default interface PaginatedList<T> {
  items: T[]
  pageNumber: number
  pageSize: number
  totalPages: number
  totalDocuments: number
  firstPage: boolean
  lastPage: boolean
}
