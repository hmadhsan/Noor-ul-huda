import { useMutation, UseMutationResult } from "react-query"
import { doFetch, FetchMethod, NoContent, ServerError } from "../../../../apiClient"
import { ApproveTajweedForm } from "./ApproveTajweedForm"

interface UpdateTajweedEnrolmentRequest {
  id: string
  form: ApproveTajweedForm
}

export const useUpdateTajweedEnrolment = (): UseMutationResult<
  NoContent, // return type
  ServerError,
  UpdateTajweedEnrolmentRequest
> => {
  return useMutation<NoContent, ServerError, UpdateTajweedEnrolmentRequest>(
    ({ id, form }: UpdateTajweedEnrolmentRequest) =>
      doFetch<NoContent>(`/api/enrolment/tajweed/${id}`, FetchMethod.PUT, form)
  )
}
