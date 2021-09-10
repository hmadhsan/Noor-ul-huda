import { Menu, MenuDivider, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"
import { UserAccountButton } from "./UserAccountButton"

export const AccountSwitcher = () => {
  return (
    <Menu>
      <UserAccountButton />
      <MenuList shadow="lg" py="4" color={useColorModeValue("gray.600", "gray.200")} px="3">
        <Text fontWeight="medium" mb="2">
          joe.biden@chakra-ui.com
        </Text>
        <MenuDivider />
        <MenuItem rounded="md">Workspace settings</MenuItem>
        <MenuDivider />
        <MenuItem rounded="md">Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}
