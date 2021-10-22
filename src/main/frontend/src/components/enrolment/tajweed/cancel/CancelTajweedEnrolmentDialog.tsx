import {
  Button,
  Alert,
  AlertIcon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Container,
  useBoolean
} from "@chakra-ui/react"
import { useRef, useEffect, useCallback } from "react"
import { useCancelTajweedEnrolment } from "./useCancelTajweedEnrolment"

interface CancelTajweedEnrolmentDialogProps {
  enrolmentId: string
  onConfirmationSuccess: () => void
  children?: never
}

export const CancelTajweedEnrolmentDialog = ({
  enrolmentId,
  onConfirmationSuccess
}: CancelTajweedEnrolmentDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useBoolean()

  const [cancelEnrolment, setCancelEnrolment] = useBoolean()

  const { mutate, isLoading, isSuccess, isError, error, reset } = useCancelTajweedEnrolment()

  const clearState = useCallback(() => {
    if (cancelEnrolment) {
      setCancelEnrolment.off()
    }
    reset()
    setIsOpen.off()
  }, [cancelEnrolment, reset, setCancelEnrolment, setIsOpen])

  const onCloseHandler = () => {
    clearState()
  }

  useEffect(() => {
    if (cancelEnrolment) {
      mutate({ id: enrolmentId })
    }
  }, [cancelEnrolment, enrolmentId, mutate])

  useEffect(() => {
    if (isSuccess) {
      clearState()
      onConfirmationSuccess()
    }
  }, [clearState, isSuccess, onConfirmationSuccess])

  return (
    <>
      <Button variant="ghost" colorScheme="red" onClick={setIsOpen.on} isDisabled={isLoading}>
        Cancel
      </Button>
      <AlertDialog
        motionPreset="slideInRight"
        leastDestructiveRef={cancelRef}
        onClose={setIsOpen.off}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>"Cancel enrolment ?"</AlertDialogHeader>
          <AlertDialogBody>"Are you sure ? You can't undo this action afterwards."</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseHandler} isDisabled={isLoading}>
              Close
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={setCancelEnrolment.on}
              isLoading={isLoading}
              isDisabled={isSuccess}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
          {isError ? (
            <Container mb="1">
              <Alert status="error" rounded="md" justifyContent="space-evenly">
                <AlertIcon />
                {error?.message}
              </Alert>
            </Container>
          ) : null}
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
