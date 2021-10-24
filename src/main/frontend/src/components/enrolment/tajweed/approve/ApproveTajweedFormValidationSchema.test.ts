import { ValidationError } from "yup"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"
import { ApproveTajweedForm } from "./ApproveTajweedForm"
import { ApproveTajweedFormValidationSchema } from "./ApproveTajweedFormValidationSchema"

describe("tajweed approval form validations", () => {
  const form: ApproveTajweedForm = {
    name: "A",
    contactNumber: "0406000000",
    email: "a@test.com",
    occupation: "ABC",
    level: "1",
    notes: "notes",
    address: {
      street: "1 Test Street",
      suburb: "NOBLE PARK",
      postcode: "3174",
      state: "Victoria"
    },
    status: EnrolmentStatus.APPROVE
  }

  test("should fail name field required validation", () => {
    return ApproveTajweedFormValidationSchema.validate({ ...form, name: "" }).then(
      () => {
        throw Error("should have failed required field validation for name")
      },
      (error: ValidationError) => {
        expect(error.path).toEqual("name")
        expect(error.errors).toEqual(["Required"])
      }
    )
  })

  describe("contact number validations", () => {
    test("should fail contactNumber field required validation", () => {
      return ApproveTajweedFormValidationSchema.validate({ ...form, contactNumber: "" }).then(
        () => {
          throw Error("should have failed required field validation for contactNumber")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("contactNumber")
          expect(error.errors).toEqual(["Required"])
        }
      )
    })

    test("should fail mobile format validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        contactNumber: "0406-666666"
      }).then(
        () => {
          throw Error("should have failed mobile format validation")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("contactNumber")
          expect(error.errors).toEqual([
            "Mobile number format 04XXXXXXXX. Landline number format 0XXXXXXXXX (Allowed area codes 02, 03, 07 or 08)"
          ])
        }
      )
    })

    test("should fail mobile length validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        contactNumber: "04066666"
      }).then(
        () => {
          throw Error("should have failed mobile length validation")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("contactNumber")
          expect(error.errors).toEqual([
            "Mobile number format 04XXXXXXXX. Landline number format 0XXXXXXXXX (Allowed area codes 02, 03, 07 or 08)"
          ])
        }
      )
    })

    test("should fail landline format validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        contactNumber: "03-99999999"
      }).then(
        () => {
          throw Error("should have failed landline format validation")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("contactNumber")
          expect(error.errors).toEqual([
            "Mobile number format 04XXXXXXXX. Landline number format 0XXXXXXXXX (Allowed area codes 02, 03, 07 or 08)"
          ])
        }
      )
    })

    test("should fail landline length validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        contactNumber: "0399999"
      }).then(
        () => {
          throw Error("should have failed landline length validation")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("contactNumber")
          expect(error.errors).toEqual([
            "Mobile number format 04XXXXXXXX. Landline number format 0XXXXXXXXX (Allowed area codes 02, 03, 07 or 08)"
          ])
        }
      )
    })

    test.each`
      areacode
      ${"01"}
      ${"05"}
      ${"06"}
      ${"09"}
    `("should fail landline area code validation for '$areacode'", ({ areacode }) => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        contactNumber: `${areacode}99999999`
      }).then(
        () => {
          throw Error("should have failed landline area code validation")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("contactNumber")
          expect(error.errors).toEqual([
            "Mobile number format 04XXXXXXXX. Landline number format 0XXXXXXXXX (Allowed area codes 02, 03, 07 or 08)"
          ])
        }
      )
    })
  })

  describe("email validations", () => {
    test("should fail email field required validation", () => {
      return ApproveTajweedFormValidationSchema.validate({ ...form, email: "" }).then(
        () => {
          throw Error("should have failed required field validation for email")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("email")
          expect(error.errors).toEqual(["Required"])
        }
      )
    })

    test("should fail email format validation", () => {
      return ApproveTajweedFormValidationSchema.validate({ ...form, email: "test@abc" }).then(
        () => {
          throw Error("should have failed format validation for email")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("email")
          expect(error.errors).toEqual(["Email is invalid"])
        }
      )
    })
  })

  test("should fail occupation field required validation", () => {
    return ApproveTajweedFormValidationSchema.validate({ ...form, occupation: "" }).then(
      () => {
        throw Error("should have failed required field validation for occupation")
      },
      (error: ValidationError) => {
        expect(error.path).toEqual("occupation")
        expect(error.errors).toEqual(["Required"])
      }
    )
  })

  describe("address validations", () => {
    test("should fail street field required validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        address: { ...form.address, street: "" }
      }).then(
        () => {
          throw Error("should have failed required field validation for street")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("address.street")
          expect(error.errors).toEqual(["Required"])
        }
      )
    })

    test("should fail suburb field required validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        address: { ...form.address, suburb: "" }
      }).then(
        () => {
          throw Error("should have failed required field validation for suburb")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("address.suburb")
          expect(error.errors).toEqual(["Required"])
        }
      )
    })

    test("should fail state field required validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        address: { ...form.address, state: "" }
      }).then(
        () => {
          throw Error("should have failed required field validation for state")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("address.state")
          expect(error.errors).toEqual(["Required"])
        }
      )
    })

    test("should fail postcode field required validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        address: { ...form.address, postcode: "" }
      }).then(
        () => {
          throw Error("should have failed required field validation for postcode")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("address.postcode")
          expect(error.errors).toEqual(["Required"])
        }
      )
    })

    test("should fail postcode format validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        address: { ...form.address, postcode: "12ab" }
      }).then(
        () => {
          throw Error("should have failed format validation for postcode")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("address.postcode")
          expect(error.errors).toEqual(["Post code should contain 4 digits"])
        }
      )
    })

    test("should fail postcode length validation", () => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        address: { ...form.address, postcode: "317" }
      }).then(
        () => {
          throw Error("should have failed postcode length validation")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("address.postcode")
          expect(error.errors).toEqual(["Post code should contain 4 digits"])
        }
      )
    })
  })

  describe("level field validations", () => {
    test("should fail level field required validation", () => {
      return ApproveTajweedFormValidationSchema.validate({ ...form, level: "" }).then(
        () => {
          throw Error("should have failed required field validation for level")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("level")
          expect(error.errors).toEqual(["Required"])
        }
      )
    })

    test.each`
      level
      ${"0"}
      ${"5"}
    `("should fail level field allowed values validation for '$level'", ({ level }) => {
      return ApproveTajweedFormValidationSchema.validate({
        ...form,
        level
      }).then(
        () => {
          throw Error("should have failed level field allowed values validation")
        },
        (error: ValidationError) => {
          expect(error.path).toEqual("level")
          expect(error.errors).toEqual(["Level should be from 1 to 4"])
        }
      )
    })
  })

  test("should fail notes field length validation", () => {
    return ApproveTajweedFormValidationSchema.validate({ ...form, notes: "a".repeat(301) }).then(
      () => {
        throw Error("should have failed notes length validation")
      },
      (error: ValidationError) => {
        expect(error.path).toEqual("notes")
        expect(error.errors).toEqual(["Notes can not exceed 300 characters"])
      }
    )
  })

  test("should fail status field allowed value validation", () => {
    return ApproveTajweedFormValidationSchema.validate({
      ...form,
      status: EnrolmentStatus.SUBMITTED
    }).then(
      () => {
        throw Error("should have failed status field allowed value validation")
      },
      (error: ValidationError) => {
        expect(error.path).toEqual("status")
        expect(error.errors).toEqual(["Allowed values APPROVE"])
      }
    )
  })
})
