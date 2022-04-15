import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      px={4}
      position="sticky"
      top={0}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Link to="/">Logo</Link>
        </Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Box>
  );
};

export default Header;
