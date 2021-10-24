import { useQuery, UseQueryResult } from "react-query"
import { doFetch, FetchMethod, ServerError } from "../../../../apiClient"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"
import { Pageable } from "../../../model/Pageable"
import { TajweedEnrolment } from "../TajweedEnrolment"

export const useFetchTajweedEnrolments = (
  status: EnrolmentStatus,
  page: number,
  size: number
): UseQueryResult<Pageable<TajweedEnrolment>, ServerError> => {
  return useQuery<Pageable<TajweedEnrolment>, ServerError>(
    ["enrolments", "tajweed", status, page, size],
    () =>
      doFetch<Pageable<TajweedEnrolment>>(
        `/api/enrolment/tajweed?status=${status}&page=${page}&size=${size}`,
        FetchMethod.GET
      ),
    {
      refetchOnWindowFocus: false
    }
  )
}
