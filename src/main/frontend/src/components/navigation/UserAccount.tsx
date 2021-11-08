import { Menu, MenuDivider, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react"
import { UserAccountButton } from "./UserAccountButton"

export const UserAccount = () => {
  return (
    <Menu>
      <UserAccountButton />
      <MenuList shadow="lg" py="4" color={useColorModeValue("gray.600", "gray.200")} px="3">
        <Text fontWeight="medium" mb="2">
          user@nha.org.au
        </Text>
        <MenuDivider />
        <MenuItem rounded="md">
          {" "}
          <Text fontSize="xs">Settings</Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem rounded="md">Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}
