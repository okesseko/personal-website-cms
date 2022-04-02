import React, { ReactNode, ReactText } from "react";
import { IconType } from "react-icons";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineArticle,
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdLogout,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Article", icon: MdOutlineArticle, href: "article" },
  { name: "Category", icon: MdOutlineDashboard, href: "category" },
  { name: "Account", icon: MdOutlineAccountCircle, href: "account" },
  { name: "Settings", icon: FiSettings, href: "setting" },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="calc(100vh - 65px)"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <SidebarContent onClose={() => onClose} />
      <Box ml={{ base: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: 60 }}
      position="fixed"
      h="calc(100vh - 65px)"
      {...rest}
    >
      <Flex direction="column" height="100%" justifyContent="space-between">
        <Box>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <NavItem
          icon={MdLogout}
          href="login"
          _hover={{
            bg: "gray.400",
            color: "white",
          }}
        >
          Logout
        </NavItem>
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  function isNavItemSelected({ isActive }: { isActive: boolean }): string {
    if (isActive) return "active";
    return "";
  }

  return (
    <NavLink to={href} className={isNavItemSelected}>
      <Flex
        align="center"
        px="4"
        py="2"
        m="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};
