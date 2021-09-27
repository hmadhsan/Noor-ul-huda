import { Address } from "../../model/Address"
import { EnrolmentStatus } from "../../model/EnrolmentStatus"

export interface TajweedEnrolment {
  id: string
  name: string
  contactNumber: string
  address: Address
  submissionDate: string
  status: EnrolmentStatus
}
