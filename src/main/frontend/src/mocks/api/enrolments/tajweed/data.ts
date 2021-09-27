import { format, add } from "date-fns"
import { TajweedEnrolment } from "../../../../components/enrolment/tajweed/TajweedEnrolment"
import { EnrolmentStatus } from "../../../../components/model/EnrolmentStatus"

export const NEW_TAJWEED_ENROLMENTS: TajweedEnrolment[] = [
  {
    id: "1",
    name: "Mohammad Khan",
    contactNo: "0406000000",
    suburb: "NOBLE PARK",
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "2",
    name: "Hasnain Javed",
    contactNo: "0406111111",
    suburb: "NOBLE PARK",
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "3",
    name: "Rizwan Muzammil",
    contactNo: "0406222222",
    suburb: "DANDENONG",
    submissionDate: format(add(new Date(), { days: 1 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "4",
    name: "Muazzam Mushtaq",
    contactNo: "0406333333",
    suburb: "PAKENHAM",
    submissionDate: format(add(new Date(), { days: 3 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "5",
    name: "Mudaser Syed",
    contactNo: "0406444444",
    suburb: "KEYSBOROUGH",
    submissionDate: format(add(new Date(), { days: 4 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "6",
    name: "Ali Aziz",
    contactNo: "0406555555",
    suburb: "CLYDE",
    submissionDate: format(add(new Date(), { days: 5 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  }
]
