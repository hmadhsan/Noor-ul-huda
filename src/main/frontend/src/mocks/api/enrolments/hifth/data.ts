import { format, add } from "date-fns"
import { HifthEnrolment } from "../../../../components/enrolment/hifth/HifthEnrolment"
import { EnrolmentStatus } from "../../../../components/model/EnrolmentStatus"

export const NEW_HIFTH_ENROLMENTS: HifthEnrolment[] = [
  {
    id: "1",
    name: "Arsalan Khan",
    contactNumber: "0406000000",
    age: "28",
    grade: "I",
    gender: "Male",
    address: {
      street: "1 Test Street",
      suburb: "NOBLE PARK",
      postcode: "3174",
      state: "VIC"
    },
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    program: "Prep",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "2",
    name: "Tayyaba Kashaf",
    contactNumber: "0406111111",
    age: "26",
    grade: "II",
    gender: "Female",
    address: {
      street: "2 Test Street",
      suburb: "NOBLE PARK",
      postcode: "3174",
      state: "VIC"
    },
    submissionDate: format(new Date(), "dd/MM/yyyy"),
    program: "Advanced",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "3",
    name: "Zehra Muzammil",
    contactNumber: "0406222222",
    age: "32",
    grade: "III",
    gender: "Female",
    address: {
      street: "3 Test Street",
      suburb: "DANDENONG",
      postcode: "3175",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 1 }), "dd/MM/yyyy"),
    program: "Trial",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "4",
    name: "Aqib Mushtaq",
    contactNumber: "0406333333",
    age: "56",
    grade: "IV",
    gender: "Male",
    address: {
      street: "4 Test Street",
      suburb: "PAKENHAM",
      postcode: "3810",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 3 }), "dd/MM/yyyy"),
    program: "Fulltime",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "5",
    name: "Usama Syed",
    contactNumber: "0406444444",
    age: "34",
    grade: "V",
    gender: "Male",
    address: {
      street: "5 Test Street",
      suburb: "KEYSBOROUGH",
      postcode: "3173",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 4 }), "dd/MM/yyyy"),
    program: "Not Sure",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "6",
    name: "Noureen Aziz",
    contactNumber: "0406555555",
    age: "22",
    grade: "VI",
    gender: "Female",
    address: {
      street: "5 Test Street",
      suburb: "CLYDE",
      postcode: "3978",
      state: "VIC"
    },
    submissionDate: format(add(new Date(), { days: 5 }), "dd/MM/yyyy"),
    program: "Prep",
    status: EnrolmentStatus.SUBMITTED
  }
]
