import * as yup from "yup"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"
import { MOBILE_OR_LANDLINE_REGEX } from "../../../ui-utils"

export const ApproveTajweedFormValidationSchema = yup
  .object({
    name: yup.string().required("Required"),
    contactNumber: yup
      .string()
      .required("Required")
      .matches(
        MOBILE_OR_LANDLINE_REGEX,
        "Mobile number format 04XXXXXXXX. Landline number format 0XXXXXXXXX (Allowed area codes 02, 03, 07 or 08)"
      ),
    email: yup.string().email("Email is invalid").required("Required"),
    occupation: yup.string().required("Required"),
    address: yup
      .object({
        street: yup.string().required("Required"),
        suburb: yup.string().required("Required"),
        state: yup.string().required("Required"),
        postcode: yup
          .string()
          .required("Required")
          .matches(/^[0-9]{4,4}$/, "Post code should contain 4 digits")
      })
      .required(),
    level: yup
      .string()
      .required("Required")
      .matches(/[1-4]$/, "Level should be from 1 to 4"),
    notes: yup.string().optional().max(300, "Notes can not exceed 300 characters"),
    status: yup
      .mixed<EnrolmentStatus>()
      .oneOf([EnrolmentStatus.APPROVE], "Allowed values APPROVE")
      .required("Required")
  })
  .required()
