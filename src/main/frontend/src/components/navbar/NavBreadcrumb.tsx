import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from "@chakra-ui/react"
import { HiChevronRight } from "react-icons/hi"
import { Link } from "react-router-dom"

export const NavBreadcrumb = (props: BreadcrumbProps) => (
  <Breadcrumb
    fontSize="sm"
    {...props}
    separator={<Box as={HiChevronRight} color="gray.400" fontSize="md" top="2px" pos="relative" />}
  >
    <BreadcrumbItem color="inherit">
      <BreadcrumbLink as={Link} to="/">
        Dashboard
      </BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
)
