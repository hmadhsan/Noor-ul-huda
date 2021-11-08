import { Box, Flex, FlexProps, HStack, Img, useMenuButton } from "@chakra-ui/react"
import { HiSelector } from "react-icons/hi"

export const UserAccountButton = (props: FlexProps) => {
  const buttonProps = useMenuButton(props)
  return (
    <Flex
      as="button"
      {...buttonProps}
      minW="200"
      display="flex"
      alignItems="center"
      rounded="lg"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: "gray.600", color: "#d1dae4" }}
      _focus={{ shadow: "outline" }}
    >
      <HStack flex="1" spacing="3">
        <Img
          w="8"
          h="8"
          rounded="md"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbiUyMHNpbWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100"
          alt="Chakra UI"
        />
        <Box textAlign="start">
          <Box isTruncated fontWeight="semibold">
            NHA User
          </Box>
          <Box fontSize="xs" color="gray.400">
            ID 123343
          </Box>
        </Box>
      </HStack>
      <Box fontSize="xs" color="gray.400">
        <HiSelector />
      </Box>
    </Flex>
  )
}