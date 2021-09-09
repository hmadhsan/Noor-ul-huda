import { Box, BoxProps, HStack, Text, useColorModeValue as mode } from "@chakra-ui/react"
import * as React from "react"

interface SidebarLinkProps extends BoxProps {
  href: string
  icon?: React.ReactElement
}

export const SidebarLink = (props: SidebarLinkProps) => {
  const { children, href, icon, ...rest } = props
  return (
    <Box
      as="a"
      href={href}
      marginEnd="2"
      fontSize="sm"
      display="block"
      px="3"
      py="1"
      rounded="md"
      cursor="pointer"
      _hover={{ color: "white", bg: mode("blue.700", "gray.600") }}
      className="group"
      transition="background .1s ease-out"
      {...rest}
    >
      <HStack>
        <Box opacity={0.5} _groupHover={{ opacity: 1 }}>
          {icon}
        </Box>
        <Text>{children}</Text>
      </HStack>
    </Box>
  )
}
