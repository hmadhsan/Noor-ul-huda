import { useQuery, UseQueryResult } from "react-query"
import { doFetch, FetchMethod, ServerError } from "../../../apiClient"
import { EnrolmentStatus } from "../../model/EnrolmentStatus"
import { Pageable } from "../../model/Pageable"
import { HifthEnrolment } from "./HifthEnrolment"

export const useFetchHifthEnrolments = (
  status: EnrolmentStatus,
  page: number,
  size: number
): UseQueryResult<Pageable<HifthEnrolment>, ServerError> => {
  return useQuery<Pageable<HifthEnrolment>, ServerError>(
    ["enrolments", "hifth", status, page, size],
    () =>
      doFetch<Pageable<HifthEnrolment>>(
        `/api/enrolment/hifth?status=${status}&page=${page}&size=${size}`,
        FetchMethod.GET
      )
  )
}
