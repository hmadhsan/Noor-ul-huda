import { Box, Flex } from "@chakra-ui/react"
import { Fragment } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { UserAccount } from "./UserAccount"
interface MobileMenuButtonProps {
  onClick: () => void
  isOpen: boolean
}

export const MobileMenuButton = (props: MobileMenuButtonProps) => {
  const { onClick, isOpen } = props
  return (
    <Fragment>
      <Flex w="full" justify="space-between">
        <Box
          // display={{ base: "block", md: "none" }}
          ml="-8"
          mr="2"
          as="button"
          type="button"
          rounded="md"
          opacity={{ base: "1", md: "0" }}
          p="1"
          fontSize="xl"
          color="gray.500"
          _hover={{ bg: "gray.100" }}
          onClick={onClick}
        >
          <Box srOnly>{isOpen ? "Close Menu" : "Open Menu"}</Box>
          {isOpen ? <HiX /> : <HiMenu />}
        </Box>
        <UserAccount />
      </Flex>
    </Fragment>
  )
}
