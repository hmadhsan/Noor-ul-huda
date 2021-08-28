import {
  Menu,
  MenuDivider,
  MenuItem,  
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { AccountSwitcherButton } from './AccountSwitcherButton'

export const AccountSwitcher = () => {
  return (
    <Menu>
      <AccountSwitcherButton />
      <MenuList shadow="lg" py="4" color={useColorModeValue('gray.600', 'gray.200')} px="3">
        <Text fontWeight="medium" mb="2">
          joe.biden@chakra-ui.com
        </Text>
        <MenuDivider />
        <MenuItem rounded="md">Workspace settings</MenuItem>
        <MenuItem rounded="md">Add an account</MenuItem>
        <MenuDivider />
        <MenuItem rounded="md">Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}