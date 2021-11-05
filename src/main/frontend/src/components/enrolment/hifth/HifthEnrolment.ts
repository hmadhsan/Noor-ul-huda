import { Address } from "../../model/Address"
import { EnrolmentStatus } from "../../model/EnrolmentStatus"

export interface HifthEnrolment {
  id: string
  name: string
  contactNumber: string
  gender: string
  age: string
  grade: string
  address: Address
  submissionDate: string
  program: string
  status: EnrolmentStatus
}
