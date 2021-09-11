import { Text, TextProps } from "@chakra-ui/react"

export const NavSectionTitle = (props: TextProps) => (
  <Text
    textTransform="uppercase"
    fontSize="xs"
    fontWeight="semibold"
    letterSpacing="widest"
    paddingStart="3"
    color="gray.400"
    mb="3"
    {...props}
  />
)
