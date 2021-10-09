import {
  FormErrorMessage,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link
} from "@chakra-ui/react"
import { Address } from "../../../model/Address"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"
import { TajweedEnrolment } from "../TajweedEnrolment"
import { TajweedLevelSelect } from "./TajweedLevelSelect"
import { FieldGroup } from "./FieldGroup"
import { StateSelect } from "./StateSelect"
import React from "react"

interface TajweedForm {
  name: string
  contactNumber: string
  email: string
  occupation: string
  level: string
  address: Address
  status: EnrolmentStatus
}

interface TajweedFormModalProps {
  enrolment: TajweedEnrolment
}

export const TajweedFormModal = ({ enrolment }: TajweedFormModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <Button onClick={onOpen} bg="none">
        View
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight" size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box px={{ base: "4", md: "10" }} py="16" maxWidth="3xl" mx="auto">
              <form
                id="settings-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  alert("Form submit")
                }}
              >
                <Stack spacing="4" divider={<StackDivider />}>
                  <Heading size="lg" as="h1" paddingBottom="4">
                    Tajweed Enrolment
                  </Heading>
                  <FieldGroup title="Personal Info">
                    <VStack width="full" spacing="6">
                      <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input type="text" maxLength={255} value={enrolment.name} />
                      </FormControl>

                      <FormControl id="contactNumber">
                        <FormLabel>Contact Number</FormLabel>
                        <Input type="number" value={enrolment.contactNumber} />
                      </FormControl>

                      <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" isReadOnly value={enrolment.email} />
                      </FormControl>

                      <FormControl id="occupation">
                        <FormLabel>Occupation</FormLabel>
                        <Input type="text" value={enrolment.occupation} />
                      </FormControl>
                    </VStack>
                  </FieldGroup>
                  <FieldGroup title="Address">
                    <VStack width="full" spacing="6">
                      <FormControl id="street">
                        <FormLabel>Street</FormLabel>
                        <Input type="text" maxLength={255} value={enrolment.address.street} />
                      </FormControl>

                      <FormControl id="suburb">
                        <FormLabel>Suburb</FormLabel>
                        <Input type="text" maxLength={255} value={enrolment.address.suburb} />
                      </FormControl>

                      <StateSelect />

                      <FormControl id="postcode">
                        <FormLabel>Postcode</FormLabel>
                        <Input type="number" value={enrolment.address.postcode} />
                      </FormControl>
                    </VStack>
                  </FieldGroup>
                  <FieldGroup title="Tajweed Level">
                    <TajweedLevelSelect />
                  </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                  <HStack width="full">
                    <Button type="submit" colorScheme="blue">
                      Approve
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </HStack>
                </FieldGroup>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" colorScheme="red">
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}
