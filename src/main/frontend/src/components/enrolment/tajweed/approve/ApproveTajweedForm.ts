import { Address } from "../../../model/Address"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"

export interface ApproveTajweedForm {
  name: string
  contactNumber: string
  email: string
  occupation: string
  level: string
  notes?: string
  address: Address
  status: EnrolmentStatus
}
