import { Box, Flex, HStack } from '@chakra-ui/react'
import { BiUserCircle } from 'react-icons/bi'
import { MdDashboard } from 'react-icons/md'
import { NavItem } from './NavItem'

const MobileNavMenu = (props: { isOpen?: boolean }) => {
  const { isOpen } = props
  return (
    <Flex
      hidden={!isOpen}
      as="nav"
      direction="column"
      bg="blue.600"
      position="fixed"
      height="calc(100vh - 4rem)"
      top="16"
      insetX="0"
      zIndex={10}
      w="full"
    >
      <Box px="4">
        <NavItem.Mobile active label="Dashboard" />
        <NavItem.Mobile label="Enrolments" />
      </Box>
    </Flex>
  )
}

const DesktopNavMenu = () => (
  <HStack spacing="3" flex="1" display={{ base: 'none', lg: 'flex' }}>
    <NavItem.Desktop active icon={<MdDashboard />} label="Dashboard" />
    <NavItem.Desktop icon={<BiUserCircle />} label="Enrolments" />
  </HStack>
)

export const NavMenu = {
  Mobile: MobileNavMenu,
  Desktop: DesktopNavMenu,
}
