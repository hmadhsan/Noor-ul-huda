import { format, add } from "date-fns"
import { TajweedEnrolment } from "../../../../components/enrolment/tajweed/TajweedEnrolment"
import { EnrolmentStatus } from "../../../../components/model/EnrolmentStatus"

export const NEW_TAJWEED_ENROLMENTS: TajweedEnrolment[] = [
  {
    id: "1",
    name: "Mohammad Khan",
    contactNumber: "0406000000",
    address: {
      street: "1 Test Street",
      suburb: "NOBLE PARK",
      postcode: "3174",
      state: "VIC"
    },
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "2",
    name: "Hasnain Javed",
    contactNumber: "0406111111",
    address: {
      street: "2 Test Street",
      suburb: "NOBLE PARK",
      postcode: "3174",
      state: "VIC"
    },
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "3",
    name: "Rizwan Muzammil",
    contactNumber: "0406222222",
    address: {
      street: "3 Test Street",
      suburb: "DANDENONG",
      postcode: "3175",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 1 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "4",
    name: "Muazzam Mushtaq",
    contactNumber: "0406333333",
    address: {
      street: "4 Test Street",
      suburb: "PAKENHAM",
      postcode: "3810",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 3 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "5",
    name: "Mudaser Syed",
    contactNumber: "0406444444",
    address: {
      street: "5 Test Street",
      suburb: "KEYSBOROUGH",
      postcode: "3173",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 4 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "6",
    name: "Ali Aziz",
    contactNumber: "0406555555",
    address: {
      street: "5 Test Street",
      suburb: "CLYDE",
      postcode: "3978",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 5 }), "dd/MM/yyyy"),
    status: EnrolmentStatus.SUBMITTED
  }
]
