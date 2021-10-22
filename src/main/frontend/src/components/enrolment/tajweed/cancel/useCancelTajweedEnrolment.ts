import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import { doFetch, FetchMethod, NoContent, ServerError } from "../../../../apiClient"

interface CancelTajweedEnrolmentRequest {
  id: string
}

export const useCancelTajweedEnrolment = (): UseMutationResult<
  NoContent, // return type
  ServerError,
  CancelTajweedEnrolmentRequest
> => {
  const queryClient = useQueryClient()
  return useMutation<NoContent, ServerError, CancelTajweedEnrolmentRequest>(
    ({ id }: CancelTajweedEnrolmentRequest) =>
      doFetch<NoContent>(`/api/enrolment/tajweed/${id}`, FetchMethod.DELETE),
    {
      onSuccess: () => queryClient.invalidateQueries(["enrolments"])
    }
  )
}
