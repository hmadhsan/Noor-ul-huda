import { format, add } from "date-fns"
import { TajweedEnrolment } from "../../../../components/enrolment/tajweed/TajweedEnrolment"
import { EnrolmentStatus } from "../../../../components/model/EnrolmentStatus"

export const NEW_TAJWEED_ENROLMENTS: TajweedEnrolment[] = [
  {
    id: "1",
    name: "Mohammad Khan",
    contactNumber: "0406000000",
    email: "mk@test.com",
    occupation: "ABC",
    enrolmentReason: "Reason 1",
    applicantSignature: "Mohammad Khan",
    address: {
      street: "1 Test Street",
      suburb: "NOBLE PARK",
      postcode: "3174",
      state: "Victoria"
    },
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    marketingMethod: "Friends and Families",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "2",
    name: "Hasnain Javed",
    contactNumber: "0406111111",
    email: "hj@test.com",
    occupation: "DEF",
    enrolmentReason: "Reason 2",
    applicantSignature: "Hasnain Javed",
    address: {
      street: "2 Test Street",
      suburb: "NOBLE PARK",
      postcode: "3174",
      state: "Victoria"
    },
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    marketingMethod: "Friends and Families",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "3",
    name: "Rizwan Muzammil",
    contactNumber: "0406222222",
    email: "rm@test.com",
    occupation: "GHI",
    enrolmentReason: "Reason 3",
    applicantSignature: "Rizwan Muzammil",
    address: {
      street: "3 Test Street",
      suburb: "DANDENONG",
      postcode: "3175",
      state: "New South Wales"
    },
    submissionDate: format(add(new Date(), { days: 1 }), "dd/MM/yyyy"),
    marketingMethod: "Friends and Families",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "4",
    name: "Muazzam Mushtaq",
    contactNumber: "0406333333",
    email: "mm@test.com",
    occupation: "JKL",
    enrolmentReason: "Reason 4",
    applicantSignature: "Muazzam Mushtaq",
    address: {
      street: "4 Test Street",
      suburb: "PAKENHAM",
      postcode: "3810",
      state: "Western Australia"
    },
    submissionDate: format(add(new Date(), { days: 3 }), "dd/MM/yyyy"),
    marketingMethod: "Friends and Families",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "5",
    name: "Mudaser Syed",
    contactNumber: "0406444444",
    email: "ms@test.com",
    occupation: "MNO",
    enrolmentReason: "Reason 5",
    applicantSignature: "Mudaser Syed",
    address: {
      street: "5 Test Street",
      suburb: "KEYSBOROUGH",
      postcode: "3173",
      state: "Queensland"
    },
    submissionDate: format(add(new Date(), { days: 4 }), "dd/MM/yyyy"),
    marketingMethod: "Friends and Families",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "6",
    name: "Ali Aziz",
    contactNumber: "0406555555",
    email: "aa@test.com",
    occupation: "PQR",
    enrolmentReason: "Reason 6",
    applicantSignature: "Ali Aziz",
    address: {
      street: "5 Test Street",
      suburb: "CLYDE",
      postcode: "3978",
      state: "Northern Territory"
    },
    submissionDate: format(add(new Date(), { days: 5 }), "dd/MM/yyyy"),
    marketingMethod: "Friends and Families",
    status: EnrolmentStatus.SUBMITTED
  }
]
