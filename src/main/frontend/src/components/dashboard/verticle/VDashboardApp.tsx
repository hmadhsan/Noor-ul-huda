import { Box, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import {  
  BiEnvelope,  
  BiUserCircle,
} from 'react-icons/bi'
import {FaSchool} from 'react-icons/fa'

import { AccountSwitcher } from './AccountSwitcher'
import { NavGroup } from './NavGroup'
import { NavItem } from './NavItem'

const VDashboardApp = () => {
  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="full" direction="column" px="4" py="4">
            <AccountSwitcher />
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              <NavGroup label="Enrolments">
                <NavItem icon={<BiUserCircle />} label="Maktab" />
                <NavItem icon={<BiUserCircle />} label="Hifth" />
                <NavItem icon={<BiUserCircle />} label="Tajweed" />
              </NavGroup>

              <NavGroup label="Payments">
                <NavItem icon={<BiEnvelope />} label="Invoices" />
              </NavGroup>

              <NavGroup label="Admin">
                <NavItem icon={<FaSchool />} label="Campuses" />
              </NavGroup>
            </Stack>
          </Flex>
        </Box>
        <Box bg={mode('white', 'gray.800')} flex="1" p="6">
          <Box
            w="full"
            h="full"
            rounded="lg"
            border="3px dashed currentColor"
            color={mode('gray.200', 'gray.700')}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default VDashboardApp