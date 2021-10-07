import { Box, Stack } from "@chakra-ui/react"
import { UserAccount } from "./UserAccount"
import { ScrollArea } from "./ScrollArea"
import { NavSectionTitle } from "./NavSectionTitle"
import { SidebarLink } from "./SidebarLink"
import { BiUserCircle } from "react-icons/bi"
import { FaSchool, FaFileInvoiceDollar } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"

const NavBar = () => {
  return (
    <Box
      as="nav"
      display="block"
      flex="1"
      width="var(--sidebar-width)"
      left="0"
      py="5"
      px="3"
      color="gray.200"
      position="fixed"
    >
      <Box fontSize="sm" lineHeight="tall">
        <Box
          as="a"
          href="#"
          p="3"
          display="block"
          transition="background 0.1s"
          rounded="xl"
          _hover={{ bg: "whiteAlpha.200" }}
          whiteSpace="nowrap"
          width="var(--sidebar-width)"
          px="4"
          py="4"
        >
          <UserAccount />
        </Box>
        <ScrollArea pt="5" pb="6">
          <Stack pb="6">
            <SidebarLink href="/" icon={<MdDashboard />}>
              Dashboard
            </SidebarLink>
          </Stack>
          <Stack pb="6">
            <NavSectionTitle>Enrolments</NavSectionTitle>
            <SidebarLink href="#" icon={<BiUserCircle />}>
              Maktab
            </SidebarLink>
            <SidebarLink href="#" icon={<BiUserCircle />}>
              Hifth
            </SidebarLink>
            <SidebarLink href="/enrolments/tajweed" icon={<BiUserCircle />}>
              Tajweed
            </SidebarLink>
          </Stack>
          <Stack pb="6">
            <NavSectionTitle>Payments</NavSectionTitle>
            <SidebarLink href="#" icon={<FaFileInvoiceDollar />}>
              Invoices
            </SidebarLink>
          </Stack>
          <Stack pb="6">
            <NavSectionTitle>Admin</NavSectionTitle>
            <SidebarLink href="#" icon={<FaSchool />}>
              Campuses
            </SidebarLink>
          </Stack>
        </ScrollArea>
      </Box>
    </Box>
  )
}

export default NavBar
