import { Flex, HStack } from '@chakra-ui/react'
import { MobileHamburgerMenu } from "./MobileHamburgerMenu"
import { NavMenu } from "./NavMenu"
import { ProfileDropdown } from "./ProfileDropdown"
import { useMobileMenuState } from "./useMobileMenuState"

const NavBar = () => {
    const { isMenuOpen, toggle } = useMobileMenuState()

    return (
        <Flex align="center" bg="blue.600" color="white" px="6" minH="16">
            <Flex justify="space-between" align="center" w="full">
                <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
                <NavMenu.Mobile isOpen={isMenuOpen} />

                <NavMenu.Desktop />

                <HStack spacing="3">
                    <ProfileDropdown />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default NavBar