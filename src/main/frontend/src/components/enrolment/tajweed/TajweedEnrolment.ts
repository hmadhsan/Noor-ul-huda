import { EnrolmentStatus } from "../../model/EnrolmentStatus"

export interface TajweedEnrolment {
  id: string
  name: string
  contactNo: string
  suburb: string
  submissionDate: string
  status: EnrolmentStatus
}
