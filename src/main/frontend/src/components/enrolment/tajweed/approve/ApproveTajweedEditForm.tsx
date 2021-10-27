import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  VStack,
  Textarea,
  Select,
  SelectProps,
  Alert,
  AlertIcon,
  VisuallyHidden,
  useBoolean
} from "@chakra-ui/react"
import { TajweedEnrolment } from "../TajweedEnrolment"
import { ApproveTajweedForm } from "./ApproveTajweedForm"
import { ApproveTajweedFormValidationSchema } from "./ApproveTajweedFormValidationSchema"
import { FieldGroup } from "../../../form/FieldGroup"
import { useForm, UseFormRegisterReturn } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RequiredFormLabel } from "../../../form/RequiredFormLabel"
import { StateSelect } from "../../../form/StateSelect"
import { useUpdateTajweedEnrolment } from "./useUpdateTajweedEnrolment"
import { ErrorType, ServerError } from "../../../../apiClient"
import { addServerErrors } from "../../../ui-utils"
import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { CancelTajweedEnrolmentDialog } from "../cancel/CancelTajweedEnrolmentDialog"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"

const TAJWEED_LEVELS: string[] = ["1", "2", "3", "4"]

interface ApproveTajweedEditFormProps {
  enrolment: TajweedEnrolment
}

export const ApproveTajweedEditForm = ({ enrolment }: ApproveTajweedEditFormProps) => {
  const [isEnrolmentCanceled, setIsEnrolmentCanceled] = useBoolean()
  const [closed, setClosed] = useBoolean()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset: resetForm
  } = useForm<ApproveTajweedForm>({
    defaultValues: {
      name: enrolment.name,
      contactNumber: enrolment.contactNumber,
      email: enrolment.email,
      occupation: enrolment.occupation,
      address: enrolment.address,
      status: EnrolmentStatus.APPROVE
    },
    resolver: yupResolver(ApproveTajweedFormValidationSchema)
  })

  const {
    mutateAsync,
    isLoading,
    isSuccess,
    isError,
    error,
    reset: resetUpdateMutationState
  } = useUpdateTajweedEnrolment()

  const onHandleSubmit = (form: ApproveTajweedForm) => {
    mutateAsync({ id: enrolment.id, form }).catch((error: ServerError) => {
      if (error.type === ErrorType.VALIDATION_FAILED) {
        addServerErrors(error, setError)
      }
    })
  }

  useEffect(() => {
    if (closed || isEnrolmentCanceled) {
      resetForm()
      resetUpdateMutationState()
    }
  }, [closed, isEnrolmentCanceled, resetForm, resetUpdateMutationState])

  if (isEnrolmentCanceled) {
    return <Redirect to="/enrolments/tajweed" />
  }

  return (
    <React.Fragment>
      <Box px={{ base: "4", md: "10" }} py="16" maxWidth="3xl" mx="auto">
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Stack spacing="4" divider={<StackDivider />}>
            <Heading size="lg" as="h1" paddingBottom="4">
              Tajweed Enrolment
            </Heading>

            <FieldGroup title="Personal Info">
              <VStack width="full" spacing="6">
                <FormControl id="name" isInvalid={!!errors?.name?.message}>
                  <RequiredFormLabel label="Name" />
                  <Input
                    type="text"
                    maxLength={255}
                    {...register("name")}
                    data-testid="name-input"
                  />
                  <FormErrorMessage data-testid="name-error">
                    {errors?.name?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="contactNumber" isInvalid={!!errors?.contactNumber?.message}>
                  <RequiredFormLabel label="Contact Number" />
                  <Input
                    type="text"
                    {...register("contactNumber")}
                    data-testid="contactNumber-input"
                  />
                  <FormErrorMessage data-testid="contactNumber-error">
                    {errors?.contactNumber?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={!!errors?.email?.message}>
                  <RequiredFormLabel label="Email" />
                  <Input type="email" {...register("email")} data-testid="email-input" />
                  <FormErrorMessage data-testid="email-error">
                    {errors?.email?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="occupation" isInvalid={!!errors?.occupation?.message}>
                  <RequiredFormLabel label="Occupation" />
                  <Input type="text" {...register("occupation")} data-testid="occupation-input" />
                  <FormErrorMessage data-testid="occupation-error">
                    {errors?.occupation?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="enrolmentReason" isReadOnly>
                  <FormLabel>Reason for Enrolling</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    value={enrolment.enrolmentReason}
                    data-testid="enrolmentReason-input"
                  />
                </FormControl>

                <FormControl id="applicantSignature" isReadOnly>
                  <FormLabel>Signature</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    value={enrolment.applicantSignature}
                    data-testid="applicantSignature-input"
                  />
                </FormControl>

                <FormControl id="submissionDate" isReadOnly>
                  <FormLabel>Submission Date</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    value={enrolment.submissionDate}
                    data-testid="submissionDate-input"
                  />
                </FormControl>
              </VStack>
            </FieldGroup>

            <FieldGroup title="Address">
              <VStack width="full" spacing="6">
                <FormControl id="address.street" isInvalid={!!errors?.address?.street?.message}>
                  <RequiredFormLabel label="Street" />
                  <Input
                    type="text"
                    maxLength={100}
                    {...register("address.street")}
                    data-testid="address.street-input"
                  />
                  <FormErrorMessage data-testid="address.street-error">
                    {errors?.address?.street?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="address.suburb" isInvalid={!!errors?.address?.suburb?.message}>
                  <RequiredFormLabel label="Suburb" />
                  <Input
                    type="text"
                    maxLength={255}
                    {...register("address.suburb")}
                    data-testid="address.suburb-input"
                  />
                  <FormErrorMessage data-testid="address.suburb-error">
                    {errors?.address?.suburb?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="address.postcode" isInvalid={!!errors?.address?.postcode?.message}>
                  <RequiredFormLabel label="Postcode" />
                  <Input
                    type="text"
                    maxLength={4}
                    {...register("address.postcode")}
                    data-testid="address.postcode-input"
                  />
                  <FormErrorMessage data-testid="address.postcode-error">
                    {errors?.address?.postcode?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="address.state" isInvalid={!!errors?.address?.state?.message}>
                  <RequiredFormLabel label="State" />
                  <StateSelect
                    dataTestId="address.state-select"
                    selectedState={enrolment.address.state}
                    registerFormField={register("address.state")}
                  />
                  <FormErrorMessage data-testid="address.state-error">
                    {errors?.address?.state?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </FieldGroup>

            <FieldGroup title="Marketing">
              <FormControl id="marketingMethod" isReadOnly>
                <FormLabel>Method</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={enrolment.marketingMethod}
                  data-testid="marketingMethod-input"
                />
              </FormControl>
            </FieldGroup>

            <FieldGroup title="Tajweed Assessment">
              <VStack width="full" spacing="6">
                <FormControl id="level" isInvalid={!!errors?.level?.message}>
                  <RequiredFormLabel label="Level" />
                  <TajweedLevelSelect registerFormField={register("level")} />
                  <FormErrorMessage data-testid="level-error">
                    {errors?.level?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="notes" isInvalid={!!errors?.notes?.message}>
                  <FormLabel>Notes</FormLabel>
                  <Textarea
                    rows={5}
                    resize="none"
                    placeholder="Maximum 300 characters allowed"
                    data-testid="notes-textarea"
                    {...register("notes")}
                  />
                  <FormErrorMessage data-testid="notes-error">
                    {errors?.notes?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
              <VisuallyHidden>
                <FormControl id="status" isInvalid={!!errors?.status?.message} isReadOnly>
                  <FormLabel>Status</FormLabel>
                  <Input type="text" {...register("status")} data-testid="status-input" />
                  <FormErrorMessage data-testid="status-error">
                    {errors?.status?.message}
                  </FormErrorMessage>
                </FormControl>
              </VisuallyHidden>
            </FieldGroup>
          </Stack>

          <FieldGroup mt="8">
            <VStack width="full">
              <HStack width="full">
                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                  Approve
                </Button>
                <CancelTajweedEnrolmentDialog
                  enrolmentId={enrolment.id}
                  onConfirmationSuccess={setIsEnrolmentCanceled.on}
                />
              </HStack>
              {isSuccess ? (
                <Alert status="success" rounded="md" justifyContent="center">
                  <AlertIcon />
                  Enrolment approved
                </Alert>
              ) : isError ? (
                <Alert status="error" rounded="md" justifyContent="center">
                  <AlertIcon />
                  {error?.message}
                </Alert>
              ) : null}
            </VStack>
          </FieldGroup>
        </form>
      </Box>
      <Button colorScheme="blue" onClick={() => setClosed} data-testid="close-btn">
        Close
      </Button>
    </React.Fragment>
  )
}

interface TajweedLevelSelectProps extends SelectProps {
  registerFormField: UseFormRegisterReturn
  children?: never
}

const TajweedLevelSelect = (props: TajweedLevelSelectProps) => {
  const { registerFormField, ...selectProps } = props

  return (
    <Select {...selectProps} {...registerFormField} data-testid="level-select">
      <option key="L0" value=""></option>
      {TAJWEED_LEVELS.map((level) => (
        <option key={`L${level}`} value={level}>
          {level}
        </option>
      ))}
    </Select>
  )
}
